import React, { forwardRef, useState } from "react";
import Select, { OptionsOrGroups, GroupBase } from "react-select";
import { TextField } from "../TextField/TextField";
import "./styles/styles.scss";
import {
  ControllerRenderProps,
  Field,
  FieldArrayWithId,
} from "react-hook-form";
import { IQuantityForm, TCreateQunatity } from "@/types/quantity.types";
import { log } from "console";

interface PropsField {
  id?: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  field: ControllerRenderProps<IQuantityForm, "stockId">;
}

export const SelectField = ({
  id,
  label,
  placeholder,
  options,
  field,
  ...rest
}: PropsField) => {
  const [countryValue, setCountryValue] = useState(null);
  console.log(field.value);
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      {options && (
        <Select
          {...field}
          options={options}
          menuPortalTarget={document.body}
          placeholder={placeholder}
          classNamePrefix={"custom-select"}
          id={id}
          onChange={(val) => field.onChange(val)}
          value={options.find((option) => option.value === field.value?.value)}
          {...rest}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
        />
      )}
    </div>
  );
};

TextField.displayName = "SelectField";

// className={
// "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
// }
