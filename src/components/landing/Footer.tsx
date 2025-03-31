import React from "react";
import { Link } from "react-scroll";

function Footer() {
  return (
    <footer className="bg-[#FAFAFA] py-4">
      <div className="container mx-auto text-center">
      <div className="mb-2">
          <a href="/confidentialite" className="text-gray-600 text-sm hover:underline mx-2">
            Politique de confidentialité
          </a>
          |
          <a href="/private-policies" className="text-gray-600 text-sm hover:underline mx-2">
            Conditions d'utilisation
          </a>
        </div>
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} KO.Zua. Tous droits réservés.
        </p>
     
      </div>
    </footer>
  );
}

export default Footer;
