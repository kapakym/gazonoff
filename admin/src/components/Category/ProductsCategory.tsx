"use client";
import { categoryService } from "@/services/category.service";
import { productService } from "@/services/product.service";
import { ICategoryNode } from "@/types/category.types";
import { IMoveProducts, IProduct } from "@/types/product.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Divide, LucideDot, LucideMinus, LucidePlus } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

interface PropsCategoryNode {
  selectedCategory: ICategoryNode | undefined;
  categoryMove: ICategoryNode | undefined;
  onSelectProduct: (product: IProduct) => void;
  selectedProduct: IProduct | undefined;
  onDoubleClick?: () => void;
}

export default function ProductsCategory({
  selectedCategory,
  categoryMove,
  onSelectProduct,
  selectedProduct,
  onDoubleClick,
}: PropsCategoryNode) {
  const queryClient = useQueryClient();
  const [checkedProduct, setCheckedProduct] = useState<string[]>([]);

  const { data: productsData, isPending: isLoading } = useQuery({
    queryKey: ["products_category", selectedCategory],
    queryFn: () =>
      productService.getProductsFromCategory(selectedCategory?.id || undefined),
  });

  const {
    data: moveProductsData,
    isPending: isMoveLoading,
    mutate: moveProducts,
  } = useMutation({
    mutationKey: ["move_products"],
    mutationFn: (data: IMoveProducts) => productService.moveProducts(data),
  });

  useEffect(() => {
    setCheckedProduct([]);
  }, [selectedCategory]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["products_category", selectedCategory],
    });
  }, [moveProductsData]);

  useEffect(() => {
    if (categoryMove && checkedProduct.length) {
      console.log(categoryMove);
      moveProducts({ categoryId: categoryMove.id, products: checkedProduct });
    }
  }, [categoryMove]);

  const handleCheck = (
    event: ChangeEvent<HTMLInputElement>,
    product: IProduct
  ) => {
    if (event.target.checked)
      setCheckedProduct([...checkedProduct, product.id]);
    else
      setCheckedProduct(checkedProduct?.filter((item) => item !== product.id));
  };

  return (
    <div className="p-4 grid grid-cols-1 relative">
      <div className="grid grid-cols-5 bg-gray-500 h-10  items-left justify-center items-center px-2 sticky top-0 left-0">
        <div>Фото</div>
        <div className="col-span-2">Название </div>
        <div>Цена</div>
        <div>Элемент</div>
      </div>

      {!!productsData?.data.length &&
        productsData.data.map((product) => (
          <div
            onClick={() => onSelectProduct(product)}
            onDoubleClick={onDoubleClick}
            key={product.id}
            className={` ${selectedProduct?.id === product.id ? "bg-blue-700" : "hover:bg-slate-600 bg-slate-700 even:bg-slate-800 "}  py-1 px-1  cursor-pointer`}
          >
            <div className="grid grid-cols-5  items-center">
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
              <div>
                <input
                  type="checkbox"
                  checked={checkedProduct.includes(product.id)}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleCheck(event, product)
                  }
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
