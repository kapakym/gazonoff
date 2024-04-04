import type { LucideIcon } from "lucide-react";
import React from "react";

interface PropsButtonBar extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  caption?: string;
}

export default function ButtonBar(props: PropsButtonBar) {
  const { icon: Icon, caption, ...rest } = props;
  return (
    <button
      {...rest}
      className="border-[1px] border-gray-600 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {Icon && <Icon />}
      {caption && <span className="ml-2">{caption}</span>}
    </button>
  );
}
