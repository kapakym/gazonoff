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
    <div className="p-4 grid grid-cols-1 relative">
      <div className="grid grid-cols-4 bg-gray-500 h-10  items-left justify-center items-center px-2 sticky top-0 left-0">
        <div>Фото</div>
        <div className="col-span-2">Название </div>
        <div>Цена</div>
      </div>

      {!!productsData?.data.length &&
        productsData.data.map((product) => (
          <div
            key={product.id}
            className={` ${selectedProduct === product.id ? "bg-blue-700" : "hover:bg-slate-600 bg-slate-700 even:bg-slate-800 "}  py-1 px-1  cursor-pointer`}
          >
            <div className="grid grid-cols-4  items-center">
              <div className="w-full flex justify-center h-14 ">
                {product.photoMain && (
                  <img
                    className="object-cover p-2"
                    src={
                      process.env.NEXT_PUBLIC_STATIC_SERVER + product.photoMain
                    }
                    alt=""
                  />
                )}
              </div>
              <div className="col-span-2 text-ellipsis overflow-hidden text-nowrap">
                {product.name}
              </div>
              <div>{product.price}</div>
            </div>
          </div>
        ))}
    </div>
  );
}
