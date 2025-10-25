import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/app/middlewares/authSeller";
import Dashboard from "@/app/[locale]/store/page";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const storeId = await authSeller(userId?.toString());

    if (!storeId) {
      return NextResponse.json("storeId Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { storeId },
      orderBy: {
        createdAt: "desc",
      },
    });

    const products = await prisma.product.findMany({
      where: { storeId },
    });

    const ratings = await prisma.rating.findMany({
      where: {
        productId: {
          in: products.map((product) => product.id),
        },
      },
      include: {
        user: true,
        product: true,
      },
    });

    const dashboard = {
      ratings,
      totalOrders: orders.length,
      totalEarnings: Math.round(orders.reduce((acc, order) => acc + order.total, 0)),
      totalProducts: products.length,
    };

    return NextResponse.json({ dashboard });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
