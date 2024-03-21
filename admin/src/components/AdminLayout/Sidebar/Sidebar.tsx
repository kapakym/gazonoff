"use client";
import React from "react";
import { MENU } from "./menu.data";
import { MenuIcon } from "lucide-react";
import MenuItem from "./MenuItem";

export default function Sidebar() {
  return (
    <div className="min-h-screen px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 w-[300px]">
      <div>
        {MENU.map((item) => (
          <MenuItem item={item} key={item.link} />
        ))}
      </div>
    </div>
  );
}
