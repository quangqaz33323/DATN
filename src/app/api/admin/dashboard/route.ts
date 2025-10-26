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

    const orders = await prisma.order.count();
    const stores = await prisma.store.count();

    const allOrders = await prisma.order.findMany({
      select: {
        createdAt: true,
        total: true,
      },
    });

    let totalRevenue = 0;
    allOrders.forEach((order) => {
      totalRevenue += order.total;
    });

    const revenue = totalRevenue.toFixed(2);

    const products = await prisma.product.count();

    const dashboardData = {
      orders,
      stores,
      revenue,
      products,
      allOrders,
    };

    return NextResponse.json(dashboardData);
  } catch {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
