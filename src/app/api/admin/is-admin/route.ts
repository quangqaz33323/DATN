import authAdmin from "@/app/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    console.log("User ID:", userId);

    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const isAdmin = await authAdmin(userId);

    if (!isAdmin) {
      return NextResponse.json("Forbidden", { status: 403 });
    }

    return NextResponse.json({ isAdmin });
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
