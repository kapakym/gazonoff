import React, { forwardRef } from "react";

interface PropsField {
  id?: string;
  label?: string;
  placeholder?: string;
}

export const TextField = forwardRef<HTMLTextAreaElement, PropsField>(
  ({ id, label, placeholder, ...rest }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <textarea
          ref={ref}
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

TextField.displayName = "TextField";
