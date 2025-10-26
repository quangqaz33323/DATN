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

    const storeId = await request.json();

    if (!storeId) {
      return NextResponse.json("Missing storeId", { status: 400 });
    }

    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      return NextResponse.json("Store not found", { status: 404 });
    }

    await prisma.store.update({
      where: { id: storeId },
      data: {
        isActive: !store.isActive,
      },
    });

    return NextResponse.json({ message: "Store status toggled successfully" });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
