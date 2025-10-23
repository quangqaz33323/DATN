import authSeller from "@/app/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    const { productId } = await request.json();

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    if (!productId) {
      return NextResponse.json("Missing productId", { status: 400 });
    }

    const storeId = await authSeller(userId?.toString());

    if (!storeId) {
      return NextResponse.json("Store Unauthorized", { status: 401 });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        storeId: storeId,
      },
    });

    if (!product) {
      return NextResponse.json("Product not found", { status: 404 });
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        inStock: !product.inStock,
      },
    });

    return NextResponse.json({ message: "Product stock toggle success" });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
