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
import { TypeCategory } from "@/types/category.types";
import { IProduct, TCreateProduct } from "@/types/product.types";
import { productService } from "@/services/product.service";

interface PropsModalCategory {
  onClose: () => void;
  mode?: EModalEnum;
  id?: string;
  parentId?: string;
}

export function ModalProduct({
  onClose,
  mode = EModalEnum.CREATE,
  id,
  parentId,
}: PropsModalCategory) {
  const { register, handleSubmit, reset, setValue, resetField } =
    useForm<IProduct>({
      mode: "onChange",
    });

  const { mutate: createProduct, isPending: isPendingCreate } = useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (data: TCreateProduct) => productService.createProduct(data),
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

  const onSubmit: SubmitHandler<IProduct> = (data) => {
    console.log(data);
    if (mode === EModalEnum.CREATE) {
      createProduct({
        ...data,
        price: Number(data.price),
        bestsellers: false,
        raiting: 0,
        new: true,
        categoryId: id ? id : "root",
        photos: [],
        params: [],
      });
      onClose();
      return;
    }
    // if (id) editCategory({ id, data });
    onClose();
  };

  useEffect(() => {
    if (id && mode !== EModalEnum.CREATE) {
      getCategory(id);
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
          label="Название"
          {...register("name", { required: true, minLength: 3 })}
        />
        <Field
          label="Стоимость"
          {...register("price", { required: true, minLength: 3 })}
        />
        <Field label="Фото" {...register("photos", { minLength: 3 })} />
        <Field
          label="Главное фото"
          {...register("photoMain", { minLength: 3 })}
        />
        <Field
          label="Описание"
          {...register("description", { required: true, minLength: 3 })}
        />
        <Field
          label="Код товара"
          {...register("vendor_code", { required: true, minLength: 3 })}
        />
        <Field
          label="Характеристики товара"
          {...register("params", { required: true, minLength: 3 })}
        />
      </div>
    </Modal>
  );
}
