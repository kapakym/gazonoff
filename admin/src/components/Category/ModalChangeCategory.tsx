import { useEffect, useState } from "react";
import Modal from "../ui/Modal/Modal";
import { Field } from "../ui/Field/Field";
import { EButtonType } from "../ui/Button/button.enums";
import Button from "../ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import GlobalLoader from "../ui/GlobalLoader/GlobalLoader";
import { SubmitHandler, useForm } from "react-hook-form";
import { EModalEnum } from "../ui/Modal/mode.enums";
import { categoryService } from "@/services/category.service";
import { ICategoryNode, TypeCategory } from "@/types/category.types";
import NodeCategory from "./NodeCategory";

interface PropsModalChangeCategory {
  onClose: () => void;
}

export default function ModalChangeCategory({
  onClose,
}: PropsModalChangeCategory) {
  const { register, handleSubmit, reset, setValue, resetField } =
    useForm<TypeCategory>({
      mode: "onChange",
    });
  const [selectedCategory, setSelectedCategory] = useState<
    ICategoryNode | undefined
  >();

  const onSubmit: SubmitHandler<TypeCategory> = (data) => {
    console.log(data);
    onClose();
  };

  const handlerSelected = (category: ICategoryNode) => {
    setSelectedCategory(category);
  };

  return (
    <Modal
      title={"Выбор категории"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      onReset={reset}
      renderButtons={() => (
        <>
          <Button type="submit">Выбрать</Button>
          <Button typeButton={EButtonType.WARRNING} onClick={onClose}>
            Закрыть
          </Button>
        </>
      )}
    >
      <div className=" overflow-auto  bg-gray-800 h-screen p-2">
        <NodeCategory
          node={{
            name: "Корень",
            id: "root",
            _count: { childrens: 1, products: 0 },
          }}
          onSelected={handlerSelected}
          selectedId={selectedCategory}
        />
      </div>
    </Modal>
  );
}
