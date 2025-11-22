import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { PaymentMethod } from "@prisma/client";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const { userId, has } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { addressId, items, couponCode, paymentMethod } = await request.json();

    if (!addressId || !items || !paymentMethod || items.length === 0) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    let coupon = null;

    if (couponCode) {
      coupon = await prisma.coupon.findUnique({
        where: {
          code: couponCode.toUpperCase(),
        },
      });

      if (!coupon) {
        return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
      }
    }

    if (couponCode && coupon?.forNewUser) {
      const userOrder = await prisma.order.findMany({
        where: {
          userId,
        },
      });

      if (userOrder.length > 0) {
        return NextResponse.json({ error: "Coupon not available for new user" }, { status: 400 });
      }
    }

    const isPlusMember = has({ plan: "plus" });

    if (couponCode && coupon?.forMember) {
      if (!isPlusMember) {
        return NextResponse.json(
          { error: "Coupon not available for non-plus user" },
          { status: 400 }
        );
      }
    }

    const ordersByStore = new Map();

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.id,
        },
      });

      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }

      const storeId = product?.storeId;

      if (!ordersByStore.has(storeId)) {
        ordersByStore.set(storeId, []);
      }

      ordersByStore.get(storeId)?.push({ ...item, price: product?.price });
    }

    const orderIds = [];
    let fullAmount = 0;

    let isShippingFeeAdded = false;

    for (const [storeId, sellerItems] of ordersByStore.entries()) {
      let total = sellerItems.reduce(
        (acc: number, item: { price: number; quantity: number }) =>
          acc + item.price * item.quantity,
        0
      );

      if (couponCode) {
        const discount = typeof coupon?.discount === "number" ? coupon.discount : 0;
        if (discount > 0) {
          total -= (total * discount) / 100;
        }
      }

      if (!isPlusMember && !isShippingFeeAdded) {
        total += 100000;
        isShippingFeeAdded = true;
      }

      fullAmount += parseFloat(total.toFixed(2));

      const order = await prisma.order.create({
        data: {
          userId,
          storeId,
          addressId,
          total: parseFloat(total.toFixed(2)),
          paymentMethod,
          isCouponUsed: couponCode ? true : false,
          coupon: coupon ? coupon : {},
          orderItems: {
            create: sellerItems.map((item: { id: string; price: number; quantity: number }) => ({
              productId: item.id,
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
      });
      orderIds.push(order.id);
    }

    if (paymentMethod === PaymentMethod.STRIPE) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      const origin = await request.headers.get("origin");

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Order",
              },
              unit_amount: Math.round((fullAmount / 25_000) * 100),
            },
            quantity: 1,
          },
        ],
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
        mode: "payment",
        success_url: `${origin}/loading?nextUrl=orders`,
        cancel_url: `${origin}/cart`,
        metadata: {
          orderIds: orderIds.join(","),
          userId,
          appId: "quangwoodcraft",
        },
      });

      return NextResponse.json({ session }, { status: 200 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { cart: {} },
    });

    return NextResponse.json({ message: "Order created successfully" }, { status: 200 });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        userId,
        OR: [
          {
            paymentMethod: PaymentMethod.COD,
          },
          {
            AND: [
              {
                paymentMethod: PaymentMethod.STRIPE,
              },
              {
                isPaid: true,
              },
            ],
          },
        ],
      },
      include: {
        orderItems: { include: { product: true } },
        address: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
