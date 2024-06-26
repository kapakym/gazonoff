"use client";
import { productService } from "@/services/product.service";
import { quantityService } from "@/services/quantity.service";
import { IProduct, IProductWithQuantity } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface PropsCategoryNode {
  onSelectProduct: (product: IProduct) => void;
  selectedProduct: IProduct | undefined;
  onEditQunatity: (id: IProduct) => void;
}

export function QuantityProducts({
  onSelectProduct,
  selectedProduct,
  onEditQunatity,
}: PropsCategoryNode) {
  const [checkedProduct, setCheckedProduct] = useState<string[]>([]);

  const { data: productsData, isPending: isLoading } = useQuery({
    queryKey: ["productsWithQuantity"],
    queryFn: () => productService.getProductsWithQuantity(),
  });

  const { data: quantityData, isPending: isLoadingQuantity } = useQuery({
    queryKey: ["quantityWithProducts"],
    queryFn: () => productService.getProductsWithQuantity(),
  });

  const handleCheck = (
    event: ChangeEvent<HTMLInputElement>,
    product: IProduct
  ) => {
    if (event.target.checked)
      setCheckedProduct([...checkedProduct, product.id]);
    else
      setCheckedProduct(checkedProduct?.filter((item) => item !== product.id));
  };

  const getTotalQunatity = (product: IProductWithQuantity) => {
    return product.quantityProducts.reduce((acc, item) => {
      return (acc += item.quantity);
    }, 0);
  };

  return (
    <div className="p-4 grid grid-cols-1 relative">
      <div className="grid grid-cols-6 bg-gray-500 h-10  items-left justify-center items-center px-2 sticky top-0 left-0">
        <div>Фото</div>
        <div className="col-span-2">Название </div>
        <div>Цена</div>
        <div>Количество</div>
        <div>Добавить на склад</div>
      </div>

      {!!productsData?.data.length &&
        productsData.data.map((product) => (
          <div
            onClick={() => onSelectProduct(product)}
            key={product.id}
            className={` ${selectedProduct?.id === product.id ? "bg-blue-700" : "hover:bg-slate-600 bg-slate-700 even:bg-slate-800 "}  py-1 px-1  cursor-pointer`}
          >
            <div className="grid grid-cols-6  items-center">
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
              <div>{getTotalQunatity(product)}</div>
              <div
                className="w-full flex justify-center items-center"
                onClick={() => onEditQunatity(product)}
              >
                <PencilIcon />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
