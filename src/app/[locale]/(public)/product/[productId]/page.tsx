'use client';

import ProductDescription from "@/components/base/ProductDescription";
import ProductDetails from "@/components/base/ProductDetails";
import { useProductStore } from "@/zustand/useProductStore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Product() {
  const { productId } = useParams<{ productId: string }>();
  const products = useProductStore((state) => state.list);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find((p) => p.id === productId);
      setProduct(found);
    }
    scrollTo(0, 0);
  }, [productId, products]);

  return (
    <div className="mx-6">
      <div className="max-w-7xl mx-auto">
   
        <div className="text-gray-600 text-sm mt-8 mb-5">
          Home / Products / {product?.category}
        </div>


        {product && <ProductDetails product={product} />}

  
        {product && <ProductDescription product={product} />}
      </div>
    </div>
  );
}
