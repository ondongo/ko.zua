"use client";
import DataIteration from "@/components/DataIteration";
import ProductsFilter from "@/components/ProductsFilter";
import React, { useEffect, useRef, useState, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import NavBarStatic from "@/components/NavBarStatic";
import { Vehicle } from "@/types/vehicle";

import SortDropdown from "@/components/SortDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllVehicles, getFilteredVehicles } from "@/actions/vehicles";

function ContainerVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [filters, setFilters] = useState<any>({});
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 500 });
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [filterToggle, setFilterToggle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const prevSearchParamsRef = useRef<URLSearchParams>(new URLSearchParams());

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
      brand: params.get("brand") || "",
      location: params.get("location") || "",
      category: params.get("category") || "",
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
    if (filters.availability !== null && filters.availability !== undefined) {
      newParams.set("availability", filters.availability.toString());
    }

    // Comparaison avec les paramètres actuels pour éviter la redondance
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.toString() !== newParams.toString()) {
      router.push(`?${newParams.toString()}`);
    }
  };

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const filters = getFiltersFromURL();
      console.log("Filters:", filters); // Vérifiez ce qui est retourné par getFiltersFromURL()

      if (Object.keys(filters).length === 0) {
        // Aucun filtre appliqué, récupération de tous les véhicules
        console.log("Fetching all vehicles...");
        const data: Vehicle[] = await getAllVehicles();
        setVehicles(data);
      } else {
        // Filtrage appliqué
        const data: Vehicle[] = await getFilteredVehicles(filters);
        setVehicles(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules :", error);
      setError("Une erreur est survenue lors du chargement des véhicules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  useEffect(() => {
    // Vérification si les paramètres ont changé avant d'exécuter la fonction de récupération des données
    const currentSearchParams = new URLSearchParams(window.location.search);

    console.log("currentSearchParams:", currentSearchParams);
    if (
      currentSearchParams.toString() !== prevSearchParamsRef.current.toString()
    ) {
      prevSearchParamsRef.current = currentSearchParams;
      fetchVehicles();
    }
  }, [searchParams]);

  return (

      <main className="max-w-[1920px] bg-white mx-auto overflow-hidden">
        <NavBarStatic />
        <div className="p-10 mt-20">
          <div className="w-full flex flex-col xl:flex-row xl:space-x-[30px]">
            <div className="lg:w-[300px]">
              <ProductsFilter
                filters={filters}
                selectCategoryHandler={selectCategoryHandler}
                priceRange={priceRange}
                priceRangeHandler={priceRangeHandler}
                selectLocationHandler={selectLocationHandler}
                selectAvailabilityHandler={selectAvailabilityHandler}
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
                  <SortDropdown />
                </div>
                <div>
                  <p className="font-400 text-[13px]">
                    {vehicles.length}
                    &nbsp; results <span className="text-qgray"> trouvés</span>
                  </p>
                </div>
              </div>
              <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                <DataIteration datas={vehicles} startLength={0} endLength={6}>
                  {({ datas }: { datas: Vehicle }) => (
                    <div data-aos="fade-up" key={datas.id} className="mb-8">
                      <ProductCard datas={datas} />
                    </div>
                  )}
                </DataIteration>
              </div>
            </div>
          </div>
        </div>
      </main>
    
  );
}

export default ContainerVehicle;
