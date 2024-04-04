import { IProductForm } from "@/types/product.types";
import React, { forwardRef } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { Field } from "../Field/Field";
import ButtonBar from "../ButtonBar/ButtonBar";
import { LucideTrash } from "lucide-react";

export interface IOptionField {
  name: string;
  value: string;
}

interface PropsField {
  placeholder?: string;
  fields: FieldArrayWithId<IProductForm, "params", "id">[];
  register: UseFormRegister<IProductForm>;
  remove: UseFieldArrayRemove;
}

export const OptionsField = ({
  placeholder,
  fields,
  register,
  remove,
}: PropsField) => {
  const handlerRemoveParam = (index: number) => {
    remove(index);
  };
  return (
    <div>
      {!!fields.length &&
        fields.map((item, index) => (
          <div
            key={index + "options"}
            className="flex w-full space-x-2 mb-2 items-end"
          >
            <div className="w-1/2">
              <Field
                label="Название"
                {...register(`params.${index}.name` as const, {})}
              />
            </div>
            <div className="w-1/2 ">
              <Field
                label="Значение"
                {...register(`params.${index}.value` as const, {})}
              />
            </div>
            <div>
              <ButtonBar
                onClick={() => handlerRemoveParam(index)}
                icon={LucideTrash}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

OptionsField.displayName = "OptionsField";
