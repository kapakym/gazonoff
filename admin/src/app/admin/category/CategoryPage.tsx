"use client";
import ModalCategory from "@/components/Category/ModalCategory";
import NodeCategory from "@/components/Category/NodeCategory";
import ButtonBar from "@/components/ui/ButtonBar/ButtonBar";
import ButtonsBar from "@/components/ui/ButtonsBar/ButtonsBar";
import GlobalLoader from "@/components/ui/GlobalLoader/GlobalLoader";
import { EModalEnum } from "@/components/ui/Modal/mode.enums";
import { categoryService } from "@/services/category.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LucidePencil, LucidePlus, LucideTrash } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [isVisibleAddCategory, setIsVisibleAddCategory] = useState(false);
  const [modeModal, setModeModal] = useState<EModalEnum>(EModalEnum.CREATE);
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const [deleteId, setDeleteId] = useState<{ id: string } | undefined>();

  const queryClient = useQueryClient();

  const handlerCloseCreateModal = () => {
    setIsVisibleAddCategory(false);
    if (selectedCategory) {
      console.log("refetcj", selectedCategory);
      queryClient.invalidateQueries({
        queryKey: ["category_with_child", selectedCategory],
      });
    }
  };

  const {
    data: dataCategory,
    mutate: getCategory,
    isPending: isLoading,
  } = useMutation({
    mutationKey: ["categories"],
    mutationFn: (id: string) => categoryService.getCategoryWithChildren(id),
  });

  const {
    mutate: deleteCategory,
    isPending,
    data: dataDelete,
  } = useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => categoryService.deleteCategory(id),
    onSuccess: () => {
      getCategory("root");
    },
  });

  const handlerCreateCategory = () => {
    setModeModal(EModalEnum.CREATE);
    setIsVisibleAddCategory(true);
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

  useEffect(() => {
    getCategory("root");
  }, []);

  const handlerSelected = (id: string) => {
    setSelectedCategory(id);
  };

  return (
    <>
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
      {(isPending || isLoading) && <GlobalLoader />}

      <div className="p-4">
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

      {isVisibleAddCategory && (
        <ModalCategory
          id={selectedCategory}
          mode={modeModal}
          onClose={handlerCloseCreateModal}
        />
      )}
    </>
  );
}
