import { Link, usePathname } from "@/i18n/routing";
import { Store } from "@/types";
import { HomeIcon, LayoutListIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react";
import Image from "next/image";

const StoreSidebar = ({ storeInfo }: { storeInfo?: Store | null }) => {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Tổng quan", href: "/store", icon: HomeIcon },
    { name: "Thêm sản phẩm", href: "/store/add-product", icon: SquarePlusIcon },
    { name: "Quản lý sản phẩm", href: "/store/manage-product", icon: SquarePenIcon },
    { name: "Đơn hàng", href: "/store/orders", icon: LayoutListIcon },
  ];

  return (
    <div className="inline-flex h-full flex-col gap-5 border-r border-[#d3bfa6] bg-[#f9f5ef] shadow-inner sm:min-w-72">
      <div className="flex flex-col items-center justify-center gap-3 pt-8 max-sm:hidden">
        <Image
          className="h-16 w-16 rounded-full border-2 border-[#c49b66] shadow-md"
          src={storeInfo?.logo || "/wood_logo.png"}
          alt={storeInfo?.name || "Store Logo"}
          width={80}
          height={80}
        />
        <p className="font-medium text-[#4a3b28]">{storeInfo?.name || "Cửa hàng gỗ"}</p>
      </div>

      <div className="max-sm:mt-6">
        {sidebarLinks.map((link, index) => {
          const active = pathname === link.href;
          return (
            <Link
              key={index}
              href={link.href}
              className={`relative mx-2 my-1 flex items-center gap-3 rounded-lg p-2.5 transition-all duration-200 ${
                active
                  ? "bg-[#e9dfd1] font-medium text-[#3f2e1f] shadow-sm"
                  : "text-[#5c4b37] hover:bg-[#f0e6d9] hover:text-[#3f2e1f]"
              }`}
            >
              <link.icon size={18} className="sm:ml-3" />
              <p className="max-sm:hidden">{link.name}</p>
              {active && (
                <span className="absolute top-1.5 right-0 bottom-1.5 w-1 rounded-l bg-[#8b5e34] sm:w-1.5"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default StoreSidebar;
