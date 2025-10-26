import authAdmin from "@/app/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId!);

    if (!isAdmin) {
      return NextResponse.json("Forbidden", { status: 403 });
    }
    const stores = await prisma.store.findMany({
      where: { status: "approved" },
      include: { user: true },
    });
    return NextResponse.json(stores);
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
