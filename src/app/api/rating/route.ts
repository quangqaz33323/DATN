import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { rating, productId, orderId, review } = await req.json();

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId,
      },
    });

    if (!order) {
      return NextResponse.json("Order not found", { status: 404 });
    }

    const isAlreadyRated = await prisma.rating.findFirst({
      where: { productId, orderId },
    });

    if (isAlreadyRated) {
      return NextResponse.json("Product already rated", { status: 400 });
    }

    const response = await prisma.rating.create({
      data: {
        userId,
        productId,
        rating,
        orderId,
        review,
      },
    });

    return NextResponse.json(
      { message: "Rating created successfully", rating: response },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const ratings = await prisma.rating.findMany({
      where: { userId },
    });

    return NextResponse.json({ ratings }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
