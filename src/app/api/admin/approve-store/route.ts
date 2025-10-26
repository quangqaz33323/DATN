import authAdmin from "@/app/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId!);

    if (!isAdmin) {
      return NextResponse.json("Forbidden", { status: 403 });
    }

    const { storeId, status } = await request.json();

    if (status === "approved") {
      await prisma.store.update({
        where: { id: storeId },
        data: { status: "approved" },
      });
    } else if (status === "rejected") {
      await prisma.store.update({
        where: { id: storeId },
        data: { status: "rejected" },
      });
    }

    return NextResponse.json({ message: status + " successfully" });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const isAdmin = await authAdmin(userId!);

    if (!isAdmin) {
      return NextResponse.json("Forbidden", { status: 403 });
    }
    const stores = await prisma.store.findMany({
      where: { status: { in: ["pending", "rejected"] } },
      include: { user: true },
    });
    return NextResponse.json(stores);
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
