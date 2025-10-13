'use client'

import Image from "next/image"
import { LogOut } from "lucide-react"
import { assets } from "@/assets/assets"
import { Link } from "@/i18n/routing"

const AdminNavbar = () => {
  return (
    <header className="flex items-center justify-between px-8 sm:px-12 py-3 border-b border-[#EADAC1] bg-[#FAF7F2] shadow-sm transition-all">
     
      <Link href="/" className="relative flex items-center gap-2 text-3xl font-bold text-[#4B2E05]">
        <Image
          src={assets.gs_logo}
          alt="Logo"
          width={36}
          height={36}
          className="rounded-full shadow-sm border border-[#D7C0AE]"
        />
        <span className="tracking-tight">
          Quang<span className="text-[#A47551]">Woodcraft</span>
        </span>
        <span className="absolute -top-1 right-[-3.5rem] text-xs font-semibold px-2 py-0.5 rounded-full bg-[#A47551] text-white shadow-sm">
          Admin
        </span>
      </Link>


      <div className="flex items-center gap-5">
        <p className="text-[#5C4033] text-sm sm:text-base font-medium">Xin chào, Quản trị viên</p>
        <button
          className="flex items-center gap-2 text-sm text-[#8B5E3C] font-medium border border-[#D7C0AE] px-4 py-1.5 rounded-full hover:bg-[#EADAC1] active:scale-95 transition-all"
          onClick={() => alert('Đăng xuất')}
        >
          <LogOut size={16} />
          <span className="max-sm:hidden">Đăng xuất</span>
        </button>
      </div>
    </header>
  )
}

export default AdminNavbar
