import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

    const handlePaymentIntent = async (paymentIntent: Stripe.PaymentIntent, isPaid: boolean) => {
      const session = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const { orderIds, userId, appId } = session.data[0].metadata as {
        orderIds: string;
        userId: string;
        appId: string;
      };

      if (appId !== "quangwoodcraft") {
        return NextResponse.json({ received: true, message: "Invalid appId" }, { status: 400 });
      }

      const orderIdsArray = orderIds.split(",");

      if (isPaid) {
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            await prisma.order.update({
              where: {
                id: orderId,
              },
              data: {
                isPaid: true,
              },
            });
          })
        );

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            cart: {},
          },
        });
      } else {
        await Promise.all(
          orderIdsArray.map(async (orderId) => {
            await prisma.order.delete({
              where: {
                id: orderId,
              },
            });
          })
        );
      }
    };

    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentIntent(event.data.object, true);
        break;
      case "payment_intent.payment_failed":
        await handlePaymentIntent(event.data.object, false);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ received: false }, { status: 400 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
