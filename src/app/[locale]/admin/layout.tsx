import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
  title: "QuangWoodcraft — Bảng điều khiển quản trị",
  description:
    "Khu vực quản trị hệ thống QuangWoodcraft. Quản lý sản phẩm, đơn hàng, khách hàng và nội dung website đồ gỗ cao cấp.",
  keywords: [
    "QuangWoodcraft",
    "đồ gỗ",
    "nội thất gỗ",
    "admin",
    "bảng điều khiển",
    "quản lý sản phẩm",
  ],
  openGraph: {
    title: "QuangWoodcraft Admin",
    description:
      "Trang quản trị nội thất gỗ QuangWoodcraft — nơi bạn quản lý toàn bộ sản phẩm và cửa hàng.",
    type: "website",
    url: "https://quangwoodcraft.com/admin",
    siteName: "QuangWoodcraft",
  },
};

export default function RootAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}