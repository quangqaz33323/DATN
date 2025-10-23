import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/app/middlewares/authSeller";
import Rating from "@/components/base/Rating";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json("Missing username", { status: 400 });
    }

    const store = await prisma.store.findUnique({
      where: { username },
      include: { Product: { include: { rating: true } } },
    });

    if (!store) {
      return NextResponse.json("Store not found", { status: 404 });
    }

    return NextResponse.json({ store });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
