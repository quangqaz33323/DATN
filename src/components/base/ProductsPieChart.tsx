import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

type ProductData = {
  name: string;
  value: number;
  color: string;
};

export default function ProductsPieChart({ data }: { data: ProductData[] }) {
  return (
    <div className="w-full max-w-2xl rounded-md bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-medium text-amber-800">Product distribution</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
