import React, { forwardRef } from "react";

interface PropsField {
  isNumber?: boolean;
  id?: string;
  label?: string;
  placeholder?: string;
}

export const Field = forwardRef<HTMLInputElement, PropsField>(
  ({ isNumber, id, label, placeholder, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          ref={ref}
          onKeyDown={(event) => {
            if (
              isNumber &&
              !/[0-9]/.test(event.key) &&
              event.key !== "Backspace" &&
              event.key !== "Tab" &&
              event.key !== "Enter" &&
              event.key !== "ArrowLeft" &&
              event.key !== "ArrowRight"
            ) {
              event.preventDefault();
            }
          }}
          placeholder={placeholder}
          className={
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          }
          id={id}
          {...rest}
        />
      </div>
    );
  }
);

Field.displayName = "Field";
