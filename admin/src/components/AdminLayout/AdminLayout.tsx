"use client";
import type { PropsWithChildren } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

export default function DashboardLayout({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <div className="grid min-h-screen 2xl:grid-cols-[1.1fr_6fr] grid-cols-[1.2fr_6fr]">
      <Sidebar />

      <main className=" overflow-x-hidden max-h-screen relative">
        <Header />
        {children}
      </main>
    </div>
  );
}
