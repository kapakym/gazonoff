"use client";
import ModalCategory from "@/components/Category/ModalCategory";
import { ModalProduct } from "@/components/Category/ModalProduct";
import NodeCategory from "@/components/Category/NodeCategory";
import ProductsCategory from "@/components/Category/ProductsCategory";
import ButtonBar from "@/components/ui/ButtonBar/ButtonBar";
import ButtonsBar from "@/components/ui/ButtonsBar/ButtonsBar";
import GlobalLoader from "@/components/ui/GlobalLoader/GlobalLoader";
import { EModalEnum } from "@/components/ui/Modal/mode.enums";
import { categoryService } from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LucidePencil, LucidePlus, LucideTrash } from "lucide-react";
import { useState } from "react";

export default function CategoryPage() {
  const queryClient = useQueryClient();
  const [isVisibleAddCategory, setIsVisibleAddCategory] = useState(false);
  const [isVisibleAddProduct, setIsVisibleAddProduct] = useState(false);
  const [modeModal, setModeModal] = useState<EModalEnum>(EModalEnum.CREATE);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  const { mutate: deleteCategory, isPending } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          "category_with_child",
          data.data.parentId ? data.data.parentId : "root",
        ],
      });
    },
  });

  const handlerCloseCreateModalProduct = () => {
    setIsVisibleAddProduct(false);
  };

  const handlerCloseCreateModal = () => {
    console.log("close");
    setIsVisibleAddCategory(false);
    queryClient.invalidateQueries({
      queryKey: [
        "category_with_child",
        selectedCategory ? selectedCategory : "root",
      ],
    });
  };

  const handlerCreateCategory = () => {
    setModeModal(EModalEnum.CREATE);
    setIsVisibleAddCategory(true);
  };

  const handlerCreateProduct = () => {
    setModeModal(EModalEnum.CREATE);
    setIsVisibleAddProduct(true);
  };

  const handlerSelect = (uuid: string) => {
    setSelectedCategory(uuid);
  };

  const handlerEditCategory = () => {
    setModeModal(EModalEnum.EDIT);
    setIsVisibleAddCategory(true);
  };

  const handlerDeleteCategory = async () => {
    if (selectedCategory) {
      deleteCategory(selectedCategory);
    }
  };

  const handlerDoubleEdit = (uuid: string) => {
    handlerSelect(uuid);
    setModeModal(EModalEnum.EDIT);
    setIsVisibleAddCategory(true);
  };

  const handlerSelected = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <>
      {isPending && <GlobalLoader />}

      <div className="p-4 flex space-x-2 ">
        <div className="flex flex-col w-1/2">
          <ButtonsBar>
            <ButtonBar
              onClick={handlerCreateCategory}
              icon={LucidePlus}
              caption="Добавить"
            />
            <ButtonBar
              onClick={handlerEditCategory}
              icon={LucidePencil}
              caption="Изменить"
            />
            <ButtonBar
              onClick={handlerDeleteCategory}
              icon={LucideTrash}
              caption="Удалить"
            />
          </ButtonsBar>
          <div className=" overflow-auto  bg-gray-800 h-screen p-2">
            <NodeCategory
              node={{
                name: "Корень",
                id: "root",
                _count: { childrens: 1, products: 0 },
              }}
              onSelected={handlerSelected}
              selectedId={selectedCategory}
              onDoubleClick={handlerDoubleEdit}
            />
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <ButtonsBar>
            <ButtonBar
              onClick={handlerCreateProduct}
              icon={LucidePlus}
              caption="Добавить товар"
            />
          </ButtonsBar>
          <div className=" bg-gray-800 h-screen overflow-auto p-2">
            <ProductsCategory selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>

      {isVisibleAddCategory && (
        <ModalCategory
          id={selectedCategory}
          mode={modeModal}
          onClose={handlerCloseCreateModal}
        />
      )}

      {isVisibleAddProduct && (
        <ModalProduct
          id={selectedCategory}
          onClose={handlerCloseCreateModalProduct}
          mode={modeModal}
        />
      )}
    </>
  );
}
