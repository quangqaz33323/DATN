import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId, has } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { code } = await request.json();

    const coupon = await prisma.coupon.findUnique({
      where: {
        code: code.toUpperCase(),
        expiresAt: { gt: new Date() },
      },
    });

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    if (coupon.forNewUser) {
      const userOrder = await prisma.order.findMany({
        where: {
          userId,
        },
      });

      if (userOrder.length > 0) {
        return NextResponse.json({ error: "Coupon not available for new user" }, { status: 400 });
      }
    }

    if (coupon.forMember) {
      const hasPlusPlan = has({ plan: "plus" });
      if (!hasPlusPlan) {
        return NextResponse.json(
          { error: "Coupon not available for non-plus user" },
          { status: 400 }
        );
      }
    }
    return NextResponse.json({ coupon }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
