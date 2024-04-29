"use client";
import { ModalAddQunatity } from "@/components/Quantity/ModalAddQunatity";
import { QuantityProducts } from "@/components/Quantity/QuantityProducts";
import ButtonsBar from "@/components/ui/ButtonsBar/ButtonsBar";
import { IProduct } from "@/types/product.types";
import { useState } from "react";

export function QuantityPage() {
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();
  const [isVisibleModalEditQantity, setIsVisibleModalEditQantity] =
    useState(false);

  const handleSelectProduct = (product: IProduct | undefined) => {
    setSelectedProduct(product);
  };

  const handleCloseModalEditQuantity = () => {
    setIsVisibleModalEditQantity(false);
  };

  const handleShowModalEditQuantity = (product: IProduct) => {
    setSelectedProduct(product);
    setIsVisibleModalEditQantity(true);
  };

  return (
    <>
      <ButtonsBar>
        {/* <ButtonBar
          onClick={handlerCreateStock}
          icon={LucidePlus}
          caption="Добавить"
        />
        <ButtonBar
          onClick={handlerEditStock}
          icon={LucidePencil}
          caption="Изменить"
        />
        <ButtonBar
          onClick={handlerDeleteStock}
          icon={LucideTrash}
          caption="Удалить"
        /> */}
      </ButtonsBar>
      <div className="p-4 grid grid-cols-1 ">
        <QuantityProducts
          onSelectProduct={handleSelectProduct}
          selectedProduct={selectedProduct}
          onEditQunatity={handleShowModalEditQuantity}
        />
      </div>
      {isVisibleModalEditQantity && (
        <ModalAddQunatity
          product={selectedProduct}
          onClose={handleCloseModalEditQuantity}
        />
      )}
    </>
  );
}
