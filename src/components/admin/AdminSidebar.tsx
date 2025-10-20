import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon } from "lucide-react"
import Image from "next/image"
import { assets } from "@/assets/assets"
import { Link, usePathname } from "@/i18n/routing"

interface SidebarLink {
  name: string
  href: string
  icon: React.ElementType
}

const AdminSidebar = () => {
  const pathname = usePathname()

  const sidebarLinks: SidebarLink[] = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
    { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
    { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon },
  ]

  return (
    <aside className="inline-flex flex-col h-full border-r border-[#EADAC1] bg-[#FAF7F2] sm:min-w-60 shadow-inner">

      <div className="flex flex-col gap-3 justify-center items-center pt-8 max-sm:hidden">
        <Image
          className="w-14 h-14 rounded-full border border-[#D7C0AE] shadow-sm"
          src={assets.gs_logo}
          alt="Admin Logo"
          width={80}
          height={80}
        />
        <p className="text-[#5C4033] font-medium">Hi, QuangWoodcraft</p>
      </div>

      <nav className="mt-6 flex-1">
        {sidebarLinks.map((link, index) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={index}
              href={link.href}
              className={`relative flex items-center gap-3 p-3 rounded-lg mx-3 my-1 transition-all duration-200 ${
                isActive
                  ? "bg-[#EADAC1] text-[#4B2E05] font-medium shadow-sm"
                  : "text-[#8B5E3C] hover:bg-[#F2E6D9]"
              }`}
            >
              <link.icon size={18} className="ml-2 opacity-90" />
              <span className="max-sm:hidden">{link.name}</span>
              {isActive && (
                <span className="absolute bg-[#A47551] right-0 top-1.5 bottom-1.5 w-1 rounded-l-full"></span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default AdminSidebar
