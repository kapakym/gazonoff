import { useEffect } from "react";
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

interface PropsModalCategory {
  onClose: () => void;
  mode?: EModalEnum;
  category?: ICategoryNode | undefined;
  parentId?: string;
}

export default function ModalCategory({
  onClose,
  mode = EModalEnum.CREATE,
  category,
  parentId,
}: PropsModalCategory) {
  const { register, handleSubmit, reset, setValue, resetField } =
    useForm<TypeCategory>({
      mode: "onChange",
    });

  const { mutate: createCategory, isPending: isPendingCreate } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: TypeCategory) => categoryService.createCategory(data),
    onSuccess: () => {
      onClose();
    },
  });

  const { mutate: editCategory, isPending: isPendingEdit } = useMutation({
    mutationKey: ["editCategory"],
    mutationFn: ({ id, data }: { id: string; data: TypeCategory }) =>
      categoryService.updateCategory(id, data),
    onSuccess: (data) => {
      onClose();
    },
  });

  const {
    mutate: getCategory,
    isPending: isPendingGetCategory,
    data: CategoryData,
  } = useMutation({
    mutationKey: ["getCategory"],
    mutationFn: (id: string) => categoryService.getCategory(id),
  });

  const onSubmit: SubmitHandler<TypeCategory> = (data) => {
    if (mode === EModalEnum.CREATE) {
      data = { name: data.name, parentId: category?.id ? category.id : "root" };

      createCategory(data);
      onClose();
      return;
    }
    if (category?.id) editCategory({ id: category?.id, data });
    onClose();
  };

  useEffect(() => {
    if (category?.id && mode !== EModalEnum.CREATE) {
      getCategory(category.id);
    }
  }, []);

  useEffect(() => {
    if (CategoryData) {
      setValue("name", CategoryData.data.name);
    }
  }, [CategoryData]);

  return (
    <Modal
      title={
        mode === EModalEnum.CREATE
          ? "Добавление категории"
          : "Редактирование категории"
      }
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      onReset={reset}
      renderButtons={() => (
        <>
          <Button type="submit">
            {mode === EModalEnum.CREATE ? "Добавить" : "Сохранить"}
          </Button>
          <Button typeButton={EButtonType.WARRNING} onClick={onClose}>
            Закрыть
          </Button>
        </>
      )}
    >
      {(isPendingCreate || isPendingEdit || isPendingGetCategory) && (
        <GlobalLoader />
      )}
      <div className="space-y-2">
        <Field
          label="Название категории"
          {...register("name", { required: true, minLength: 3 })}
        />
      </div>
    </Modal>
  );
}
