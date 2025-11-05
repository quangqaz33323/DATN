"use client";

import Banner from "@/components/base/Banner";
import Footer from "@/components/base/Footer";
import Navbar from "@/components/base/Navbar";
import { useAddressStore } from "@/zustand/useAddressStore";
import { useCartStore } from "@/zustand/useCartStore";
import { useProductStore } from "@/zustand/useProductStore";
import { useUser, useAuth } from "@clerk/nextjs";
import { useLocale } from "next-intl";
import { ReactNode, useEffect, useRef } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const locale = useLocale();
  const { user } = useUser();
  const { getToken } = useAuth();

  const loadProducts = useProductStore((s) => s.loadProducts);
  const loadCartItems = useCartStore((s) => s.loadCartItems);
  const uploadCartItems = useCartStore((s) => s.uploadCartItems);
  const loadAddresses = useAddressStore((s) => s.loadAddresses);
  const cartItems = useCartStore((s) => s.cartItems);
  const isLoading = useCartStore((s) => s.isLoading);

  const isInitialLoad = useRef(true);
  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (user) {
      loadCartItems(getToken);
      loadAddresses(getToken);
      isInitialLoad.current = true;
    }
  }, [user]);

  useEffect(() => {
    if (user && !isLoading && !isInitialLoad.current) {
      uploadCartItems(getToken);
    }

    if (isInitialLoad.current && !isLoading) {
      isInitialLoad.current = false;
    }
  }, [cartItems, isLoading]);

  return (
    <main>
      <Banner />
      <Navbar locale={locale} />
      {children}
      <Footer />
    </main>
  );
}
