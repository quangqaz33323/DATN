"use client";

import Banner from "@/components/base/Banner";
import Footer from "@/components/base/Footer";
import Navbar from "@/components/base/Navbar";
import { useAddressStore } from "@/zustand/useAddressStore";
import { useCartStore } from "@/zustand/useCartStore";
import { useProductStore } from "@/zustand/useProductStore";
import { useRatingStore } from "@/zustand/useRatingStore";
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
  const loadRatings = useRatingStore((s) => s.loadRatings);

  const isInitialLoad = useRef(true);
  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      loadCartItems(getToken);
      loadAddresses(getToken);
      loadRatings(getToken);
      isInitialLoad.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user && !isLoading && !isInitialLoad.current) {
      uploadCartItems(getToken);
    }

    if (isInitialLoad.current && !isLoading) {
      isInitialLoad.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
