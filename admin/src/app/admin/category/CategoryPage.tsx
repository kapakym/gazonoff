"use client";
import ModalCategory from "@/components/Category/ModalCategory";
import ModalStock from "@/components/Stocks/ModalStock";
import ButtonBar from "@/components/ui/ButtonBar/ButtonBar";
import ButtonsBar from "@/components/ui/ButtonsBar/ButtonsBar";
import GlobalLoader from "@/components/ui/GlobalLoader/GlobalLoader";
import { EModalEnum } from "@/components/ui/Modal/mode.enums";
import { categoryService } from "@/services/category.service";
import { stocksService } from "@/services/stocks.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LucidePencil, LucidePlus, LucideTrash } from "lucide-react";
import { useState } from "react";

export default function CategoryPage() {
  const [isVisibleAddStock, setIsVisibleAddStock] = useState(false);
  const [modeModal, setModeModal] = useState<EModalEnum>(EModalEnum.CREATE);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
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
    queryKey: ["categories"],
    queryFn: () => categoryService.getCategories(),
  });

  const { mutate: deleteStock, isPending } = useMutation({
    mutationKey: ["deleteStock"],
    mutationFn: (id: string) => stocksService.deleteStock(id),
    onSuccess: () => {
      refetch();
    },
  });

  const handlerCreateStock = () => {
    setModeModal(EModalEnum.CREATE);
    setIsVisibleAddStock(true);
  };

  const handlerSelect = (uuid: string) => {
    setSelectedCategory(uuid);
  };

  const handlerEditStock = () => {
    setModeModal(EModalEnum.EDIT);
    setIsVisibleAddStock(true);
  };

  const handlerDeleteStock = () => {
    if (selectedCategory) {
      deleteStock(selectedCategory);
    }
  };

  const handlerDoubleEdit = (uuid: string) => {
    handlerSelect(uuid);
    setModeModal(EModalEnum.EDIT);
    setIsVisibleAddStock(true);
  };

  return (
    <>
      <ButtonsBar>
        <ButtonBar
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
        />
      </ButtonsBar>
      {(isPending || isLoading) && <GlobalLoader />}
      <div className="p-4 grid grid-cols-1 ">
        {!!stocksList?.data.length &&
          stocksList.data.map((item) => (
            <div
              onClick={() => handlerSelect(item.id)}
              onDoubleClick={() => handlerDoubleEdit(item.id)}
              className={` ${selectedCategory === item.id ? "bg-blue-700" : "hover:bg-slate-600 bg-slate-700 even:bg-slate-800 "}  grid grid-cols-2 py-1 px-1  cursor-pointer`}
              key={item.id}
            >
              <div>{item.name}</div>
            </div>
          ))}
      </div>
      {isVisibleAddStock && (
        <ModalCategory
          id={selectedCategory}
          mode={modeModal}
          onClose={handlerCloseCreateModal}
        />
      )}
    </>
  );
}
