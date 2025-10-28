import authAdmin from "@/app/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Miss userId", { status: 403 });
    }

    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json("Forbidden", { status: 403 });
    }

    const { coupon } = await request.json();

    coupon.code = coupon.code.toUpperCase();

    await prisma.coupon.create({
      data: coupon,
    });

    return NextResponse.json("Coupon created successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Miss userId", { status: 403 });
    }

    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json("Forbidden", { status: 403 });
    }

    const { searchParams } = request.nextUrl;

    const couponCode = searchParams.get("code");

    if (!couponCode) {
      return NextResponse.json("Miss couponCode", { status: 403 });
    }

    await prisma.coupon.delete({
      where: {
        code: couponCode.toUpperCase(),
      },
    });

    return NextResponse.json("Coupon deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing DELETE request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Miss userId", { status: 403 });
    }

    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json("Forbidden", { status: 403 });
    }

    const coupons = await prisma.coupon.findMany({});

    return NextResponse.json({ coupons });
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
