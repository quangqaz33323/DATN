"use client";

import Banner from "@/components/base/Banner";
import Footer from "@/components/base/Footer";
import Navbar from "@/components/base/Navbar";
import { useCartStore } from "@/zustand/useCartStore";
import { useProductStore } from "@/zustand/useProductStore";
import { useUser, useAuth } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { ReactNode, useEffect } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const { user } = useUser();
  const { getToken } = useAuth();

  const loadProducts = useProductStore((s) => s.loadProducts);
  const loadCartItems = useCartStore((s) => s.loadCartItems);
  const uploadCartItems = useCartStore((s) => s.uploadCartItems);
  const cartItems = useCartStore((s) => s.cartItems);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (user) {
      loadCartItems(getToken);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      uploadCartItems(getToken);
    }
  }, [cartItems]);

  return (
    <main>
      <Banner />
      <Navbar locale={locale} />
      {children}
      <Footer />
    </main>
  );
}
