"use client";
import { categoryService } from "@/services/category.service";
import { productService } from "@/services/product.service";
import { ICategoryNode } from "@/types/category.types";
import { useQuery } from "@tanstack/react-query";
import { Divide, LucideDot, LucideMinus, LucidePlus } from "lucide-react";
import { useState } from "react";

interface PropsCategoryNode {
  selectedCategory: string | undefined;
}

export default function ProductsCategory({
  selectedCategory,
}: PropsCategoryNode) {
  const [selectedProduct, setselectedProduct] = useState<string | undefined>();

  const { data: productsData, isPending: isLoading } = useQuery({
    queryKey: ["products_category", selectedCategory],
    queryFn: () => productService.getProductsFromCategory(selectedCategory),
  });

  return (
    <div className="p-4 grid grid-cols-1">
      {!!productsData?.data.length &&
        productsData.data.map((product) => (
          <div
            className={` ${selectedProduct === product.id ? "bg-blue-700" : "hover:bg-slate-600 bg-slate-700 even:bg-slate-800 "}  grid grid-cols-2 py-1 px-1  cursor-pointer`}
          >
            <div className="grid grid-cols-2">
              <div>{product.name}</div>
              <div>{product.price}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
