"use client";
import { QuantityProducts } from "@/components/Quantity/QuantityProducts";
import ModalStock from "@/components/Stocks/ModalStock";
import ButtonsBar from "@/components/ui/ButtonsBar/ButtonsBar";
import GlobalLoader from "@/components/ui/GlobalLoader/GlobalLoader";
import { EModalEnum } from "@/components/ui/Modal/mode.enums";
import { stocksService } from "@/services/stocks.service";
import { IProduct } from "@/types/product.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function QuantityPage() {
  const [isVisibleAddStock, setIsVisibleAddStock] = useState(false);
  const [modeModal, setModeModal] = useState<EModalEnum>(EModalEnum.CREATE);
  const [selectedStock, setSelectedStock] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<
    IProduct | undefined
  >();

  const handlerCloseCreateModal = () => {
    setIsVisibleAddStock(false);
    refetch();
  };

  const {
    data: stocksList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["stocks"],
    queryFn: () => stocksService.getStocks(),
  });

  const handleSelectProduct = (product: IProduct | undefined) => {
    setSelectedProduct(product);
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
      {isLoading && <GlobalLoader />}
      <div className="p-4 grid grid-cols-1 ">
        <QuantityProducts
          onSelectProduct={handleSelectProduct}
          selectedProduct={selectedProduct}
        />
      </div>
      {isVisibleAddStock && (
        <ModalStock
          id={selectedStock}
          mode={modeModal}
          onClose={handlerCloseCreateModal}
        />
      )}
    </>
  );
}
