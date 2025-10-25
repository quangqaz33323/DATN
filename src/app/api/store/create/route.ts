import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import imagekit from "@/configs/imageKit";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact") as string;
    const address = formData.get("address") as string;
    const image = formData.get("image") as File;

    if (!name || !description || !username || !email || !contact || !address || !image) {
      return NextResponse.json("Missing required fields", { status: 400 });
    }

    const store = await prisma.store.findFirst({
      where: { userId: userId?.toString() },
    });

    if (store) {
      return NextResponse.json({ status: store.status });
    }

    const isUsernameTaken = await prisma.store.findFirst({
      where: { username: username.toLowerCase() },
    });

    if (isUsernameTaken) {
      return NextResponse.json("Username is already taken", { status: 409 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    const response = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${image.name}`,
      folder: "logos",
    });

    const imageURL = imagekit.url({
      path: response.filePath,
      transformation: [
        {
          quality: "auto",
        },
        { format: "webp" },
        { width: "512" },
      ],
    });

    const newStore = await prisma.store.create({
      data: {
        userId: userId!.toString(),
        name,
        description,
        username: username.toLowerCase(),
        email,
        contact,
        address,
        logo: imageURL,
      },
    });

    await prisma.user.update({
      where: { id: userId!.toString() },
      data: {
        store: { connect: { id: newStore.id } },
      },
    });

    return NextResponse.json({ message: "Applied, waiting for approval" });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const store = await prisma.store.findFirst({
      where: { userId: userId!.toString() },
    });

    if (store) {
      return NextResponse.json({ status: store.status });
    }

    return NextResponse.json({ status: "no store" });
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
