import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal/Modal";
import { Field } from "../ui/Field/Field";
import { EButtonType } from "../ui/Button/button.enums";
import Button from "../ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { stocksService } from "@/services/stocks.service";
import { TypeAddStock } from "@/types/stocks.types";
import GlobalLoader from "../ui/GlobalLoader/GlobalLoader";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EModalEnum } from "../ui/Modal/mode.enums";
import { IQuantityForm, TCreateQunatity } from "@/types/quantity.types";
import { SelectField } from "../ui/SelectField/SelectField";

interface PropsModalStock {
  onClose: () => void;
  id?: string;
}

export function ModalAddQunatity({ onClose, id }: PropsModalStock) {
  const { register, handleSubmit, reset, setValue, control } =
    useForm<IQuantityForm>({
      mode: "onChange",
    });

  const { mutate: editStock, isPending: isPendingEdit } = useMutation({
    mutationKey: ["editStock"],
    mutationFn: ({ id, data }: { id: string; data: TypeAddStock }) =>
      stocksService.updateStock(id, data),
    onSuccess: () => {
      onClose();
    },
  });

  const {
    mutate: getStock,
    isPending: isPendingGetStock,
    data: stockData,
  } = useMutation({
    mutationKey: ["getStock"],
    mutationFn: (id: string) => stocksService.getStock(id),
  });

  const onSubmit: SubmitHandler<IQuantityForm> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (id) {
      getStock(id);
    }
  }, []);

  useEffect(() => {
    if (stockData) {
      // setValue("name", stockData.data.name);
      // setValue("address", stockData.data.address);
    }
  }, [stockData]);

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
              options={[
                { label: "Bangladesh", value: "Bangladesh1" },
                { label: "India", value: "India2" },
                { label: "China", value: "China3" },
                { label: "Finland", value: "Finland4" },
              ]}
              label="Название склада"
              placeholder="Выберите склад"
            />
          )}
        />

        <Field
          label="Количество"
          {...register("quantity", { required: true, minLength: 3 })}
        />
      </div>
    </Modal>
  );
}
