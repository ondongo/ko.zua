"use client";
import DataIteration from "@/components/landing/DataIteration";
import React, { useEffect, useRef, useState, Suspense } from "react";
import { Vehicle } from "@/types/vehicle";

import SortDropdown from "@/components/landing/SortDropdown";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllVehicles, getFilteredVehicles } from "@/actions/vehicles";
import SkeletonProductCard from "../skeletons/SkeletonProductCard";
import ProductCardVehicle from "@/components/products/ProductCardVehicle";
import ProductsVehiclesFilter from "@/components/products/ProductsVehiclesFilter";
import Pagination from "../common/tables/Pagination";
import { Filter } from "lucide-react";
import ProductsVehiclesFilterMobile from "../products/ProductsVehiclesFilterMobile";

function ContainerVehicle() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<any>({});
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 100, max: 500 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const prevSearchParamsRef = useRef<URLSearchParams>(new URLSearchParams());
  const [sortOption, setSortOption] = useState<string>("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  /* Manage selection input  */
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

  /* Manage Filters */
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
    if (filters.brand) newParams.set("brand", filters.brand);
    // Comparaison avec les paramètres actuels pour éviter la redondance
    const currentParams = new URLSearchParams(window.location.search);
    if (currentParams.toString() !== newParams.toString()) {
      router.push(`?${newParams.toString()}`);
    }
  };

  const sortVehicles = (vehicles: Vehicle[], option: string) => {
    console.log(
      "Véhicules avant tri :",
      vehicles.map((v) => ({
        id: v.id,
        createdAt: v.createdAt,
        parsedDate: new Date(v.createdAt),
        isValid: !isNaN(new Date(v.createdAt).getTime()),
      }))
    );
    if (option === "price_asc") {
      return [...vehicles].sort((a, b) => a.price - b.price);
    } else if (option === "price_desc") {
      return [...vehicles].sort((a, b) => b.price - a.price);
    } else if (option === "newest") {
      return [...vehicles]
        .filter((v) => v.createdAt && !isNaN(new Date(v.createdAt).getTime()))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
    return vehicles;
  };

  useEffect(() => {
    setVehicles((prev) => sortVehicles(prev, sortOption));
  }, [sortOption]);

  /* Manage pagination */

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const filters = getFiltersFromURL();
      //let data: Vehicle[];
      let result: any;
      if (Object.keys(filters).length === 0) {
        result = await getAllVehicles(currentPage, 12);
      } else {
        result = await getFilteredVehicles(filters, {
          page: currentPage,
          pageSize: 12,
        });
      }

      setVehicles(result.vehicles);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Erreur lors de la récupération des véhicules :", error);
      //setError("Une erreur est survenue lors du chargement des véhicules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, [currentPage]);

  useEffect(() => {
    // Vérification si les paramètres ont changé avant d'exécuter la fonction de récupération des données
    const currentSearchParams = new URLSearchParams(window.location.search);

    console.log("currentSearchParams:", currentSearchParams);
    console.log(">>>>>>>>>>>>>>>", Number(currentSearchParams.get("page")));
    console.log(">>>>>>>>CurrentPage", currentPage);

    if (
      currentSearchParams.toString() !== prevSearchParamsRef.current.toString()
    ) {
      prevSearchParamsRef.current = currentSearchParams;
      fetchVehicles();
    }
  }, [searchParams]);

  return (
    <>
      <div className="p-2 lg:p-10 mt-2">
        <div className="w-full flex flex-col xl:flex-row xl:space-x-[30px]">
          <div className="hidden lg:block lg:w-[300px]">
            <ProductsVehiclesFilter
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
                  {vehicles.length} &nbsp; results{" "}
                  <span className="text-qgray"> trouvés</span>
                </p>
              </div>

              {/* Button to open modal on mobile */}
              <div
                className="md:hidden bg-yellowkouzua text-white py-2 px-4 rounded-full shadow-md cursor-pointer w-full flex items-center justify-between "
                onClick={toggleModal}
              >
                {/* Icône de filtre */}

                <span>Appliquer des filtres</span>
                <Filter className="h-5 w-5" />
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col gap-3 justify-center items-center z-[999999]">
                  <div className="h-auto overflow-y-scroll bg-white max-h-[70vh]  w-11/12 md:w-1/3 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Filtres</h3>
                      <button
                        onClick={toggleModal}
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.04289 16.5413C5.65237 16.9318 5.65237 17.565 6.04289 17.9555C6.43342 18.346 7.06658 18.346 7.45711 17.9555L11.9987 13.4139L16.5408 17.956C16.9313 18.3466 17.5645 18.3466 17.955 17.956C18.3455 17.5655 18.3455 16.9323 17.955 16.5418L13.4129 11.9997L17.955 7.4576C18.3455 7.06707 18.3455 6.43391 17.955 6.04338C17.5645 5.65286 16.9313 5.65286 16.5408 6.04338L11.9987 10.5855L7.45711 6.0439C7.06658 5.65338 6.43342 5.65338 6.04289 6.0439C5.65237 6.43442 5.65237 7.06759 6.04289 7.45811L10.5845 11.9997L6.04289 16.5413Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                    {/* Add your filter content here */}
                    <ProductsVehiclesFilterMobile
                      filters={filters}
                      selectCategoryHandler={selectCategoryHandler}
                      priceRange={priceRange}
                      priceRangeHandler={priceRangeHandler}
                      selectLocationHandler={selectLocationHandler}
                      selectAvailabilityHandler={selectAvailabilityHandler}
                      selectSaleOrRentHandler={selectSaleOrRentHandler}
                    />
                  </div>

                  <div className="h-auto  bg-white w-11/12 md:w-1/3 rounded-lg p-6">
                    <button
                      onClick={() => {
                        handleFilterSubmit();
                        toggleModal();
                      }}
                      className="bg-yellowkouzua text-white px-4 py-2 rounded-lg w-full"
                    >
                      Appliquer
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="grid xl:grid-cols-3 grid-cols-2  xl:gap-[30px] gap-2 mb-[40px]">
              {loading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <SkeletonProductCard key={index} />
                  ))}
                </>
              ) : (
                <DataIteration datas={vehicles} startLength={0} endLength={6}>
                  {({ datas }: { datas: Vehicle }) => (
                    <div data-aos="fade-up" key={datas.id} className="mb-8">
                      <ProductCardVehicle datas={datas} />
                    </div>
                  )}
                </DataIteration>
              )}
            </div>

            {!loading && (
              <div className="w-full flex justify-center items-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ContainerVehicle;
