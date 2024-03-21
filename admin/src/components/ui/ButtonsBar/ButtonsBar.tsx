import React, { PropsWithChildren } from "react";
interface ButtonsBarProps extends PropsWithChildren {}
export default function ButtonsBar({ children }: ButtonsBarProps) {
  return (
    <div className="w-full border-b-[1px]  border-gray-600 p-4 rounded-xl flex  space-x-2">
      {children}
    </div>
  );
}
