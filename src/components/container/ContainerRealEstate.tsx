"use client";
import DataIteration from "@/components/landing/DataIteration";

import React, { useEffect, useRef, useState, Suspense } from "react";

import SortDropdown from "@/components/landing/SortDropdown";
import { useRouter, useSearchParams } from "next/navigation";

import SkeletonProductCard from "../skeletons/SkeletonProductCard";
import { RealEstate } from "@/types/real_estate";
import ProductsImmobiliersFilter from "../products/ProductsImmobiliersFilter";
import ProductCardRealEstate from "../products/ProductCardRealEstate";
import {
  getAllRealEstates,
  getFilteredRealEstates,
} from "@/actions/realEstates";

function ContainerRealEstate() {
  const [realEstate, setRealEstate] = useState<RealEstate[]>([]);

  const [filters, setFilters] = useState<any>({});
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 500 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const prevSearchParamsRef = useRef<URLSearchParams>(new URLSearchParams());
  const [sortOption, setSortOption] = useState<string>("default");

  const selectSaleOrRentHandler = (e: any) => {
    const { value } = e.target;
    console.log("selectSaleOrRentHandler", value);
    setFilters((prev: any) => ({ ...prev, saleStatus: value }));
    console.log("filter", filters);
  };

  const selectCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilters((prev: any) => ({ ...prev, category: value }));
  };

  const selectLocationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilters((prev: any) => ({ ...prev, location: value }));
  };

  const selectAvailabilityHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (value != null) {
      console.log(
        "Availability =======>> Ou on est là",
        availability as boolean
      );
      setFilters((prev: any) => ({ ...prev, availability: value }));
    }
  };

  const priceRangeHandler = (value: { min: number; max: number }) => {
    setPriceRange(value);
    setFilters((prev: any) => ({
      ...prev,
      minPrice: value.min,
      maxPrice: value.max,
    }));
  };

  const getFiltersFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const availabilityParam = params.get("availability");
    const availability =
      availabilityParam === "true"
        ? true
        : availabilityParam === "false"
        ? false
        : null;

    const filters: any = {
      location: params.get("location") || "",
      category: params.get("category") || "",
      saleStatus: params.get("saleStatus") || "",
    };

    // Ajoutez minPrice et maxPrice uniquement si les paramètres sont présents dans l'URL
    const minPrice = params.get("minPrice");
    const maxPrice = params.get("maxPrice");

    if (minPrice) {
      filters.minPrice = Number(minPrice);
    }
    if (maxPrice) {
      filters.maxPrice = Number(maxPrice);
    }

    if (availability !== null) {
      filters.availability = availability;
    }

    // Si aucun filtre valide n'est présent (pas de minPrice/maxPrice, de catégorie, etc.), ne retournez pas de filtre
    if (
      !filters.minPrice &&
      !filters.maxPrice &&
      !filters.brand &&
      !filters.location &&
      !filters.category &&
      !filters.saleStatus &&
      availability === null
    ) {
      return {};
    }

    return filters;
  };

  const handleFilterSubmit = () => {
    const newParams = new URLSearchParams();

    if (filters.category) newParams.set("category", filters.category);
    if (filters.minPrice)
      newParams.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice)
      newParams.set("maxPrice", filters.maxPrice.toString());
    if (filters.location) newParams.set("location", filters.location);
    if (filters.saleStatus) newParams.set("saleStatus", filters.saleStatus);
    if (filters.availability !== null && filters.availability !== undefined) {
      newParams.set("availability", filters.availability.toString());
    }

    // Comparaison avec les paramètres actuels pour éviter la redondance
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.toString() !== newParams.toString()) {
      router.push(`?${newParams.toString()}`);
    }
  };

  const sortRealEstate = (realEstate: RealEstate[], option: string) => {
    console.log(
      "Véhicules avant tri :",
      realEstate.map((r) => ({
        id: r.id,
        // createdAt: r.createdAt,
        // parsedDate: new Date(r.createdAt),
        //isValid: !isNaN(new Date(r.createdAt).getTime()),
      }))
    );
    if (option === "price_asc") {
      return [...realEstate].sort((a, b) => a.price - b.price);
    } else if (option === "price_desc") {
      return [...realEstate].sort((a, b) => b.price- a.price);
    } else if (option === "newest") {
       return [...realEstate]
        .filter((v) => v.createdAt && !isNaN(new Date(v.createdAt).getTime()))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ); 
    }
    return realEstate;
  };

  useEffect(() => {
    setRealEstate((prev) => sortRealEstate(prev, sortOption));
  }, [sortOption]);

  const fetchRealEstates = async () => {
    setLoading(true);
    try {
      const filters = getFiltersFromURL();

      let data: RealEstate[];

      if (Object.keys(filters).length === 0) {
        data = await getAllRealEstates();
      } else {
        data = await getFilteredRealEstates(filters);
      }

      setRealEstate(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des Immo :", error);
      setError("Une erreur est survenue lors du chargement des Immo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealEstates();
  }, []);

  useEffect(() => {
    // Vérification si les paramètres ont changé avant d'exécuter la fonction de récupération des données
    const currentSearchParams = new URLSearchParams(window.location.search);

    console.log("currentSearchParams:", currentSearchParams);
    if (
      currentSearchParams.toString() !== prevSearchParamsRef.current.toString()
    ) {
      prevSearchParamsRef.current = currentSearchParams;
      fetchRealEstates();
    }
  }, [searchParams]);

  return (
    <>
      <div className="p-10 mt-2">
        <div className="w-full flex flex-col xl:flex-row xl:space-x-[30px]">
          <div className="lg:w-[300px]">
            <ProductsImmobiliersFilter
              filters={filters}
              selectCategoryHandler={selectCategoryHandler}
              priceRange={priceRange}
              priceRangeHandler={priceRangeHandler}
              selectLocationHandler={selectLocationHandler}
              selectAvailabilityHandler={selectAvailabilityHandler}
              selectSaleOrRentHandler={selectSaleOrRentHandler}
            />

            <button
              className="btn btn-sm btn-accent  mt-4  bg-[#111828] hover:bg-[#111828]"
              onClick={handleFilterSubmit}
            >
              Filtrer
            </button>
          </div>

          <div className="flex-1">
            <div className="w-full bg-[#FAFAFA] shadow-sm md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px] rounded-lg">
              <div className="flex space-x-3 items-center">
                <span className="font-400 text-[13px]">Trier par :</span>
                <SortDropdown
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                />
              </div>
              <div>
                <p className="font-400 text-[13px]">
                  {realEstate.length}
                  &nbsp; results <span className="text-qgray"> trouvés</span>
                </p>
              </div>
            </div>
            <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
              {loading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <SkeletonProductCard key={index} />
                  ))}
                </>
              ) : (
                <DataIteration datas={realEstate} startLength={0} endLength={6}>
                  {({ datas }: { datas: RealEstate }) => (
                    <div data-aos="fade-up" key={datas.id} className="mb-8">
                      <ProductCardRealEstate datas={datas} />
                    </div>
                  )}
                </DataIteration>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContainerRealEstate;
