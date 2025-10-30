import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon } from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useUser } from "@clerk/nextjs";

interface SidebarLink {
  name: string;
  href: string;
  icon: React.ElementType;
}

const AdminSidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const sidebarLinks: SidebarLink[] = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon },
    { name: "Stores", href: "/admin/stores", icon: StoreIcon },
    { name: "Approve Store", href: "/admin/approve", icon: ShieldCheckIcon },
    { name: "Coupons", href: "/admin/coupons", icon: TicketPercentIcon },
  ];

  return (
    <aside className="inline-flex h-full flex-col border-r border-[#EADAC1] bg-[#FAF7F2] shadow-inner sm:min-w-60">
      <div className="flex flex-col items-center justify-center gap-3 pt-8 max-sm:hidden">
        <Image
          className="h-14 w-14 rounded-full border border-[#D7C0AE] shadow-sm"
          src={user?.imageUrl || ""}
          alt="Admin Logo"
          width={80}
          height={80}
        />
        <p className="font-medium text-[#5C4033]">{user?.fullName}</p>
      </div>

      <nav className="mt-6 flex-1">
        {sidebarLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={index}
              href={link.href}
              className={`relative mx-3 my-1 flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                isActive
                  ? "bg-[#EADAC1] font-medium text-[#4B2E05] shadow-sm"
                  : "text-[#8B5E3C] hover:bg-[#F2E6D9]"
              }`}
            >
              <link.icon size={18} className="ml-2 opacity-90" />
              <span className="max-sm:hidden">{link.name}</span>
              {isActive && (
                <span className="absolute top-1.5 right-0 bottom-1.5 w-1 rounded-l-full bg-[#A47551]"></span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
