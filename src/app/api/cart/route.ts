import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { cart } = await request.json();

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        cart: cart,
      },
    });
    return NextResponse.json({ message: "Cart updated" }, { status: 200 });
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

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return NextResponse.json({ cart: user?.cart }, { status: 200 });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
