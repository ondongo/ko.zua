"use client";
import React, { useState } from "react";
import NotificationDropdown from "@/components/admin/header/NotificationDropdown";
import UserDropdown from "@/components/admin/header/UserDropdown";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";

function AppHeader() {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  return (
    <div className="bg-red-500">
      <div className="flex items-center justify-between w-full h-full px-6">
        {/* Bouton pour ouvrir la sidebar */}
        <button
          className="w-10 h-10 text-gray-500 rounded-xl xl:h-11 xl:w-11 xl:border"
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
        >
          {isMobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6.21967 7.28131L11.999 12L17.7782 7.28131"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M0.583252 1H14.6666" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Boutons Notification & User */}
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <UserDropdown />
          <button
            onClick={toggleApplicationMenu}
            className="w-10 h-10 text-gray-700 rounded-xl hover:bg-gray-100 xl:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M5.99902 10.4951L7.49902 11.9951L5.99902 13.5051"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
