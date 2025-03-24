"use client";

import { useSidebar } from "@/context/SidebarContext";
import HeaderAdmin from "@/components/admin/layout/HeaderAdmin";
import AppSidebar from "@/components/admin/layout/AppSidebar";

import React from "react";
export default function ContainerAdmin({ children }: any) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[240px]"
    : "lg:ml-[90px]";

  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixe à gauche) */}
      <AppSidebar />

     
      <div
        className={`flex-1 transition-all flex-col duration-300 ease-in-out ${mainContentMargin}`}
      >
     
        <HeaderAdmin />

        {/* Contenu de la page */}
        <main className="flex-1 overflow-auto p-4  bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
