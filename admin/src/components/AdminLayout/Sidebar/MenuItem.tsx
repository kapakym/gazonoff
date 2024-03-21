import React from "react";
import { IMenuItem } from "./menu.interface";
import Link from "next/link";

export default function MenuItem({ item }: { item: IMenuItem }) {
  return (
    <Link
      href={item.link}
      className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      <item.icon />
      <span className="ms-3">{item.name}</span>
    </Link>
  );
}
