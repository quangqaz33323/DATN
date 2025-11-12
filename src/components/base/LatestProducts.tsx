"use client";

import React from "react";
import Title from "./Title";
import ProductCard from "./ProductCard";
import { useProductStore } from "@/zustand/useProductStore";
import { useTranslations } from "next-intl";

const DISPLAY_QUALITY = 4;

const LatestProducts = () => {
  const t = useTranslations("common");
  const products = useProductStore((state) => state.list);

  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const displayProducts = sortedProducts.slice(0, DISPLAY_QUALITY);

  return (
    <div className="mx-auto my-30 max-w-7xl px-6">
      <Title
        title={t("latestProducts")}
        description={t("showTotalProduct", {
          productQuantity: products.length < DISPLAY_QUALITY ? products.length : DISPLAY_QUALITY,
          totalQuantity: products.length,
        })}
        href="/shop"
      />

      <div className="mt-12 grid grid-cols-2 flex-wrap gap-6 sm:flex">
        {displayProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
