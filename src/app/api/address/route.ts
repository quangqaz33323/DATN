import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const { address } = await request.json();

    address.userId = userId;

    const newAddress = await prisma.address.create({
      data: address,
    });
    return NextResponse.json({ newAddress, message: "Address add Successfully" }, { status: 200 });
  } catch (error) {
    console.error("POST /api/address error", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const addresses = await prisma.address.findMany({
      where: {
        userId,
      },
    });
    return NextResponse.json({ addresses }, { status: 200 });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
