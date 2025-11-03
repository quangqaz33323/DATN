import StoreLayout from "@/components/store/StoreLayout";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "QuangWoodcraft - Bảng điều khiển cửa hàng",
  description:
    "Quản lý cửa hàng đồ gỗ của bạn dễ dàng với QuangWoodcraft. Theo dõi đơn hàng, sản phẩm và doanh thu trong không gian quản trị ấm áp, tinh tế.",
  openGraph: {
    title: "QuangWoodcraft - Store Dashboard",
    description:
      "Bảng điều khiển dành cho các cửa hàng đồ gỗ thủ công trên QuangWoodcraft. Quản lý sản phẩm, đơn hàng và doanh thu dễ dàng.",
    url: "https://quangwoodcraft.com/store",
    siteName: "QuangWoodcraft",
    locale: "vi_VN",
    type: "website",
  },
  keywords: ["đồ gỗ", "nội thất gỗ", "gỗ thủ công", "quản lý cửa hàng đồ gỗ", "QuangWoodcraft"],
};

export default function RootStoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        <StoreLayout>{children}</StoreLayout>;
      </SignedIn>
      <SignedOut>
        <div className="flex min-h-screen items-center justify-center">
          <SignIn fallbackRedirectUrl="/store" routing="hash" />
        </div>
      </SignedOut>
    </>
  );
}
