import { useState, useEffect } from "react";
import RangeSlider from "../RangeSlider";

interface ProductsFilterProps {
  filters: any;
  selectCategoryHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  priceRange: { min: number; max: number };
  priceRangeHandler: (range: { min: number; max: number }) => void;
  selectLocationHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectAvailabilityHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectSaleOrRentHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductsImmobiliersFilter: React.FC<ProductsFilterProps> = ({
  selectLocationHandler,
  priceRange,
  priceRangeHandler,
  selectAvailabilityHandler,
  filters,
  selectCategoryHandler,
  selectSaleOrRentHandler,
}) => {
  return (
    <div
      className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-[#FAFAFA] shadow-sm px-[30px] pt-[40px] rounded-lg 
      }`}
    >
      {/* Categories */}
      <div className="filter-subject-item pb-4 border-b border-gray-300">
        <h1 className="text-black text-base font-semibold mb-4">
          Filtrer par catégories
        </h1>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          value={filters.category}
          onChange={(e: any) => selectCategoryHandler(e)}
        >
          <option value="">Choisir une catégorie</option>
          <option value="Appartement">Appartement</option>
          <option value="Terrain">Terrain</option>

        </select>
      </div>

      <div className="mt-4 pb-6 border-b border-gray-300">
        <h1 className="text-black text-base font-semibold mb-4">
          Filtrer par type d'offre
        </h1>
        <select
          value={filters.saleStatus}
          onChange={(e: any) => selectSaleOrRentHandler(e)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Tous</option>
          <option value="RENT">En Location</option>
          <option value="SALE">En Vente</option>
        </select>
      </div>

      {/* Availability */}
      <div className="pt-4 pb-4 border-b border-gray-300">
        <h1 className="text-black text-base font-semibold mb-4">
          Disponibilité
        </h1>
        <div className="filter-availability">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            value={filters.availability}
            onChange={(e: any) => selectAvailabilityHandler(e)}
          >
            <option value="">Choisir disponibilité</option>
            <option value="true">Disponible</option>
            <option value="false">Indisponible</option>
          </select>
        </div>
      </div>

      {/* Price Range */}
      <div className="pb-6 border-b border-gray-300 mt-4">
        <h1 className="text-black text-base font-semibold mb-6">
          Filtrer par prix
        </h1>
        <RangeSlider
          priceRange={priceRange}
          priceRangeHandler={priceRangeHandler}
        />
      </div>

      {/* Locations */}
      <div className="filter-subject-item pb-4 border-b mt-4">
        <h1 className="text-black text-base font-semibold mb-4">
          Localisation
        </h1>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          value={filters.location}
          onChange={(e: any) => selectLocationHandler(e)}
        >
          <option value="">Choisir une ville</option>
          <option value="Brazzaville">Brazzaville</option>
          <option value="Pointe-Noire">Pointe-Noire</option>
        </select>
      </div>
    </div>
  );
};

export default ProductsImmobiliersFilter;
