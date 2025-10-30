"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersAreaChart({
  allOrders,
}: {
  allOrders: { createdAt: string; total: number }[];
}) {
  const ordersPerDay = allOrders.reduce((acc: any, order) => {
    const date = new Date(order.createdAt).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(ordersPerDay).map(([date, count]) => ({
    date,
    orders: count,
  }));

  return (
    <div className="h-[320px] w-full max-w-5xl rounded-md bg-white p-4 text-sm shadow-sm">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="text-lg font-medium text-amber-800">Orders / Day</h3>
        <span className="text-sm text-slate-500">Last {chartData.length} days</span>
      </div>
      <ResponsiveContainer width="100%" height="calc(100% - 36px)">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#fffbeb" />
          <XAxis dataKey="date" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#D97706"
            fill="rgba(217,119,6,0.18)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
