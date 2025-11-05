"use client";

import { useRouter } from "@/i18n/routing";
import { useCartStore } from "@/zustand/useCartStore";
import { PackageIcon, Search, ShoppingCart } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useClerk, useUser, UserButton, Protect } from "@clerk/nextjs";

const Navbar = ({ locale }: { locale: string }) => {
  const t = useTranslations("nav");
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const total = useCartStore((state) => state.total);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/shop?search=${search}`);
  };

  return (
    <nav className="sticky top-0 z-[1] bg-white shadow-sm transition-colors dark:bg-gray-900">
      <div className="mx-4 sm:mx-6">
        <div className="mx-auto flex max-w-[1380px] items-center justify-between py-4">
          <Link
            href="/"
            className="relative text-3xl font-semibold text-slate-700 sm:text-4xl dark:text-white"
          >
            <span className="text-[#B5651D]">Quang</span>Woodcraft
            <span className="text-5xl leading-0 text-[#B5651D]">.</span>
            <Protect plan={"plus"}>
              <p className="absolute -top-1 -right-8 rounded-full bg-[#B5651D] px-2 py-0.5 text-[10px] font-semibold text-white">
                {t("plus")}
              </p>
            </Protect>
          </Link>

          <div className="hidden items-center gap-4 text-slate-600 sm:flex lg:gap-6 dark:text-slate-300">
            <Link href="/" className="transition-colors hover:text-[#B5651D]">
              {t("home")}
            </Link>
            <Link href="/shop" className="transition-colors hover:text-[#B5651D]">
              {t("shop")}
            </Link>
            <Link href="/about" className="transition-colors hover:text-[#B5651D]">
              {t("about")}
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[#B5651D]">
              {t("contact")}
            </Link>

            <form
              onSubmit={handleSearch}
              className="hidden w-xs items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 text-sm focus-within:ring-2 focus-within:ring-[#B5651D] xl:flex dark:bg-gray-800"
            >
              <Search size={18} className="text-slate-500" />
              <input
                className="w-full bg-transparent text-slate-700 placeholder-slate-500 outline-none dark:text-white dark:placeholder-slate-400"
                type="text"
                placeholder={t("searchPlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-slate-700 transition-colors hover:text-[#B5651D] dark:text-slate-200"
            >
              <ShoppingCart size={18} />
              {t("cart")}
              {total > 0 && (
                <span className="absolute -top-1 left-3 flex size-3.5 items-center justify-center rounded-full bg-[#B5651D] text-[8px] text-white">
                  {total}
                </span>
              )}
            </Link>

            <LanguageSwitcher locale={locale} />
            {!user ? (
              <button
                onClick={(e) => openSignIn()}
                className="rounded-full bg-[#B5651D] px-6 py-2 text-white shadow-sm transition hover:bg-[#9A4D14]"
              >
                {t("login")}
              </button>
            ) : (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    labelIcon={<PackageIcon size={16} />}
                    label={t("myOrder")}
                    onClick={() => router.push("orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            )}
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <LanguageSwitcher locale={locale} />

            {user ? (
              <div>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      labelIcon={<ShoppingCart size={16} />}
                      label={t("cart")}
                      onClick={() => router.push("cart")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action
                      labelIcon={<PackageIcon size={16} />}
                      label={t("myOrder")}
                      onClick={() => router.push("orders")}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            ) : (
              <button
                onClick={(e) => openSignIn()}
                className="rounded-full bg-[#B5651D] px-5 py-1.5 text-sm text-white transition hover:bg-[#9A4D14]"
              >
                {t("login")}
              </button>
            )}
          </div>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
    </nav>
  );
};

export default Navbar;
