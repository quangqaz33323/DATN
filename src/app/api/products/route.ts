import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    let products = await prisma.product.findMany({
      where: { inStock: true },
      include: {
        rating: {
          select: {
            createdAt: true,
            rating: true,
            review: true,
            user: { select: { name: true, image: true } },
          },
        },
        store: true,
      },
      orderBy: { createdAt: "desc" },
    });

    products = products.filter((product) => product.store.isActive);
    return NextResponse.json({ products }, { status: 200 });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
