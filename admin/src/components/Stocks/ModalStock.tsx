import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal/Modal";
import { Field } from "../ui/Field/Field";
import { EButtonType } from "../ui/Button/button.enums";
import Button from "../ui/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { stocksService } from "@/services/stocks.service";
import { TypeAddStock } from "@/types/stocks.types";
import GlobalLoader from "../ui/GlobalLoader/GlobalLoader";
import { SubmitHandler, useForm } from "react-hook-form";
import { EModalEnum } from "../ui/Modal/mode.enums";

interface PropsModalStock {
  onClose: () => void;
  mode?: EModalEnum;
  id?: string;
}

export default function ModalStock({
  onClose,
  mode = EModalEnum.CREATE,
  id,
}: PropsModalStock) {
  const { register, handleSubmit, reset, setValue } = useForm<TypeAddStock>({
    mode: "onChange",
  });

  const { mutate: createStock, isPending: isPendingCreate } = useMutation({
    mutationKey: ["createStock"],
    mutationFn: (data: TypeAddStock) => stocksService.createStock(data),
    onSuccess: () => {
      onClose();
    },
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

  const onSubmit: SubmitHandler<TypeAddStock> = (data) => {
    if (mode === EModalEnum.CREATE) {
      createStock(data);
      return;
    }
    if (id) editStock({ id, data });
  };

  useEffect(() => {
    if (id) {
      getStock(id);
    }
  }, []);

  useEffect(() => {
    if (stockData) {
      setValue("name", stockData.data.name);
      setValue("address", stockData.data.address);
    }
  }, [stockData]);

  return (
    <Modal
      title={
        mode === EModalEnum.CREATE
          ? "Добавление склада"
          : "Редактирование склада"
      }
      onSubmit={handleSubmit(onSubmit)}
      onClose={onClose}
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
      {(isPendingCreate || isPendingEdit) && <GlobalLoader />}
      <div className="space-y-2">
        <Field
          label="Название склада"
          {...register("name", { required: true, minLength: 3 })}
        />
        <Field
          label="Адрес"
          {...register("address", { required: true, minLength: 3 })}
        />
      </div>
    </Modal>
  );
}
