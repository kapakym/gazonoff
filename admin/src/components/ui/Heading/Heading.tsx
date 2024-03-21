"use client";
import type { PropsWithChildren } from "react";

export default function Heading({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="w-full flex flex-col py-4">
      <h2 className="text-2xl px-4">{children}</h2>
      <div className="mt-2 h-[1px] w-full bg-gray-600"></div>
    </div>
  );
}
