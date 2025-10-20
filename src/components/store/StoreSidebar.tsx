import { Link, usePathname } from "@/i18n/routing";
import { Store } from "@/types";
import { HomeIcon, LayoutListIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react"
import Image from "next/image"

const StoreSidebar = ({ storeInfo }: { storeInfo?: Store | null }) => {
  const pathname = usePathname()

  const sidebarLinks = [
    { name: 'Tổng quan', href: '/store', icon: HomeIcon },
    { name: 'Thêm sản phẩm', href: '/store/add-product', icon: SquarePlusIcon },
    { name: 'Quản lý sản phẩm', href: '/store/manage-product', icon: SquarePenIcon },
    { name: 'Đơn hàng', href: '/store/orders', icon: LayoutListIcon },
  ]

  return (
    <div className="inline-flex h-full flex-col gap-5 border-r border-[#d3bfa6] bg-[#f9f5ef] sm:min-w-60 shadow-inner">

      <div className="flex flex-col gap-3 justify-center items-center pt-8 max-sm:hidden">
        <Image
          className="w-16 h-16 rounded-full shadow-md border-2 border-[#c49b66]"
          src={storeInfo?.logo || '/wood_logo.png'}
          alt={storeInfo?.name || 'Store Logo'}
          width={80}
          height={80}
        />
        <p className="text-[#4a3b28] font-medium">{storeInfo?.name || 'Cửa hàng gỗ'}</p>
      </div>


      <div className="max-sm:mt-6">
        {sidebarLinks.map((link, index) => {
          const active = pathname === link.href
          return (
            <Link
              key={index}
              href={link.href}
              className={`relative flex items-center gap-3 p-2.5 rounded-lg mx-2 my-1 transition-all duration-200
                ${active
                  ? 'bg-[#e9dfd1] text-[#3f2e1f] font-medium shadow-sm'
                  : 'text-[#5c4b37] hover:bg-[#f0e6d9] hover:text-[#3f2e1f]'
                }`}
            >
              <link.icon size={18} className="sm:ml-3" />
              <p className="max-sm:hidden">{link.name}</p>
              {active && (
                <span className="absolute bg-[#8b5e34] right-0 top-1.5 bottom-1.5 w-1 sm:w-1.5 rounded-l"></span>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default StoreSidebar
