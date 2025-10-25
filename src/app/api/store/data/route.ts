import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const username = searchParams.get("username")?.toLowerCase();

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
