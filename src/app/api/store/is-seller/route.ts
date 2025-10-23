import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import authSeller from "@/app/middlewares/authSeller";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const isSeller = await authSeller(userId.toString());

    const storeInfo = await prisma.store.findUnique({
      where: { userId: userId.toString() },
    });

    return NextResponse.json({ isSeller, storeInfo });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
