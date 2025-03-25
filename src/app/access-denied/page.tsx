"use client";
import GridShape from "@/components/common/GridShape";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AccessPage() {
  const handleSignout = async () => {
    // Sign out logic here
    await signOut({ callbackUrl: "/signin" });
  };
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">
      <GridShape />
      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
        <h1 className="mb-8 font-bold text-gray-800 text-title-md    xl:text-title-2xl">
         Oups !<br/> Accès refusé
        </h1>

        <p className="mt-10 mb-6 text-base text-gray-700   sm:text-lg">
          seul l&apos;administrateur à le droit d&apos;accès au panel !
          <br /> Veuillez vous connecter à un autre compte
        </p>

        <button
          onClick={handleSignout}
          className="inline-flex items-center justify-center rounded-lg border border-red-300 bg-white px-5 py-3.5 text-sm font-medium text-red-700 shadow-theme-xs hover:bg-gray-50 hover:text-red-800 "
        >
          Se déconnecter
        </button>
      </div>
      {/* <!-- Footer --> */}
      <p className="absolute text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2  ">
        &copy; {new Date().getFullYear()} - Kozua
      </p>
    </div>
  );
}
