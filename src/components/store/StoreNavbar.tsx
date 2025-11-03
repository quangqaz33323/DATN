import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const StoreNavbar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50 px-12 py-4 shadow-sm transition-all">
      <Link href="/" className="relative text-4xl font-bold tracking-tight text-amber-900">
        <span className="text-amber-700">Quang</span>Wood
        <span className="text-5xl leading-none text-amber-700">.</span>
        <p className="absolute -top-1 -right-14 flex items-center gap-2 rounded-full bg-amber-700 px-3 py-0.5 text-xs font-semibold text-white shadow">
          Store
        </p>
      </Link>

      <div className="flex items-center gap-3 font-medium text-amber-900">
        <p>
          Xin chào, <span className="font-semibold">{user?.firstName}</span>
        </p>
        <UserButton />
      </div>
    </div>
  );
};

export default StoreNavbar;
