import Image from "next/image";
import { assets } from "@/assets/assets";
import { Link } from "@/i18n/routing";
import { useUser, UserButton } from "@clerk/nextjs";

const AdminNavbar = () => {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between border-b border-[#EADAC1] bg-[#FAF7F2] px-8 py-3 shadow-sm transition-all sm:px-12">
      <Link href="/" className="relative flex items-center gap-2 text-3xl font-bold text-[#4B2E05]">
        <Image
          src={assets.gs_logo}
          alt="Logo"
          width={36}
          height={36}
          className="rounded-full border border-[#D7C0AE] shadow-sm"
        />
        <span className="tracking-tight">
          Quang<span className="text-[#A47551]">Woodcraft</span>
        </span>
        <span className="absolute -top-1 right-[-3.5rem] rounded-full bg-[#A47551] px-2 py-0.5 text-xs font-semibold text-white shadow-sm">
          Admin
        </span>
      </Link>

      <div className="flex items-center gap-5">
        <p className="text-sm font-medium text-[#5C4033] sm:text-base">
          Xin chào, {user?.firstName}
        </p>
        <UserButton />
      </div>
    </header>
  );
};

export default AdminNavbar;
