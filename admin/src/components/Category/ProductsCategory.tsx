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
  const { data: productsData, isPending: isLoading } = useQuery({
    queryKey: ["products_category", selectedCategory],
    queryFn: () => productService.getProductsFromCategory(selectedCategory),
  });

  return (
    <div className="py-1 flex flex-col">
      {!!productsData?.data.length &&
        productsData.data.map((product) => <div>{product.name}</div>)}
    </div>
  );
}
