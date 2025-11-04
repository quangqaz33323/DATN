import authSeller from "@/app/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { orderId, status } = await request.json();

    await prisma.order.update({
      where: {
        id: orderId,
        storeId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ message: "Order status updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const storeId = await authSeller(userId);

    if (!storeId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        storeId,
      },
      include: {
        user: true,
        address: true,
        orderItems: { include: { product: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
