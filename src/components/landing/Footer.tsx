"use client";
import React from "react";
import { Link } from "react-scroll";

function Footer() {
  return (
    <footer className="bg-[#FAFAFA]  py-4">
      <div className="container mx-auto text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} KO.Zua. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
