import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal/Modal";
import { Field } from "../ui/Field/Field";
import { EButtonType } from "../ui/Button/button.enums";
import Button from "../ui/Button/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { stocksService } from "@/services/stocks.service";
import GlobalLoader from "../ui/GlobalLoader/GlobalLoader";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IQuantityForm, TCreateQunatity } from "@/types/quantity.types";
import { SelectField } from "../ui/SelectField/SelectField";
import { quantityService } from "@/services/quantity.service";
import { IProduct } from "@/types/product.types";

interface PropsModalStock {
  onClose: () => void;
  product?: IProduct;
}

export function ModalAddQunatity({ onClose, product }: PropsModalStock) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );

  const { register, handleSubmit, control } = useForm<IQuantityForm>({
    mode: "onChange",
  });

  const { mutate: editQuantity, isPending: isPendingEdit } = useMutation({
    mutationKey: ["editQuantity"],
    mutationFn: (data: TCreateQunatity) => quantityService.createQuantity(data),
    onSuccess: () => {
      onClose();
    },
  });

  const {
    data: stocksList,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["stocks"],
    queryFn: () => stocksService.getStocks(),
  });

  const onSubmit: SubmitHandler<IQuantityForm> = (data) => {
    if (product) {
      editQuantity({
        productId: product.id,
        quantity: Number(data.quantity),
        stockId: data.stockId.value,
      });
    }
  };

  useEffect(() => {
    if (stocksList?.data.length) {
      setOptions(
        stocksList.data.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      );
    }
  }, [stocksList]);

  return (
    <Modal
      title={"Добавление товара на склад"}
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
      renderButtons={() => (
        <>
          <Button type="submit">"Изменить"</Button>
          <Button typeButton={EButtonType.WARRNING} onClick={onClose}>
            Закрыть
          </Button>
        </>
      )}
    >
      {isPendingEdit && <GlobalLoader />}
      <div className="space-y-2">
        <Controller
          name="stockId"
          control={control}
          render={({ field }) => (
            <SelectField
              field={field}
              options={options}
              label="Название склада"
              placeholder="Выберите склад"
            />
          )}
        />

        <Field
          label="Количество"
          {...register("quantity", { required: true, minLength: 1 })}
        />
      </div>
    </Modal>
  );
}
