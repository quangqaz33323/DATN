import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import imagekit from "@/configs/imageKit";
import authSeller from "@/app/middlewares/authSeller";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const storeId = await authSeller(userId?.toString());

    if (!storeId) {
      return NextResponse.json("Store Unauthorized", { status: 401 });
    }

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const mrp = formData.get("mrp") as string;
    const price = formData.get("price");
    const category = formData.get("category") as string;
    const images = formData.getAll("images") as File[];

    if (!name || !description || !mrp || !price || !category || images.length < 1) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }

    const imagesUrl = await Promise.all(
      images.map(async (image, index) => {
        const buffer = Buffer.from(await image.arrayBuffer());

        const res = await imagekit.upload({
          file: buffer,
          fileName: `product_${Date.now()}_${index}_${image.name}`,
          folder: `products`,
        });

        const url = imagekit.url({
          path: res.filePath,
          transformation: [{ quality: "auto" }, { format: "webp" }, { width: "1024" }],
        });

        return url;
      })
    );

    await prisma.product.create({
      data: {
        name,
        description,
        mrp: Number(mrp),
        price: Number(price),
        category,
        images: imagesUrl,
        storeId,
      },
    });

    return NextResponse.json({ message: "Product add success" });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const storeId = await authSeller(userId?.toString());

    if (!storeId) {
      return NextResponse.json("Store Unauthorized", { status: 401 });
    }

    const products = await prisma.product.findMany({
      where: { storeId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
