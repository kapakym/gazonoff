import React, { PropsWithChildren } from "react";
interface ButtonsBarProps extends PropsWithChildren {}
export default function ButtonsBar({ children }: ButtonsBarProps) {
  return (
    <div className="w-full border-[1px]  border-gray-600 p-2 flex  space-x-2 text-xs">
      {children}
    </div>
  );
}
