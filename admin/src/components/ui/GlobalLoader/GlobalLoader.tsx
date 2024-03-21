"use client";
import { LucideLoader2 } from "lucide-react";
import React from "react";

export default function GlobalLoader() {
  LucideLoader2;
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-black flex bg-opacity-20 ">
      <div className=" absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]">
        <LucideLoader2 className="  animate-spin w-12 h-12 " color="green" />
      </div>
    </div>
  );
}
