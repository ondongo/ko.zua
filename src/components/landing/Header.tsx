"use client";
import React, { useState, useEffect, useContext, Fragment } from "react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import SearchMobile from "./SearchMobile";
import { useMediaQuery } from "react-responsive";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { SearchContext } from "../../context/SearchContext";
import { Popover, Transition } from "@headlessui/react";
import { FaCar, FaMapMarkerAlt, FaTruck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { quartiersBrazzaville, quartiersPointeNoire } from "@/utils/records";

function Header() {
  const { setSearchActive } = useContext(SearchContext);
  const [header, setHeader] = useState(false);

  const [nav, setNav] = useState(false);
  const mobileMode = useMediaQuery({ query: "(max-width: 768px)" });
  const desktopMode = useMediaQuery({ query: "max-width: 1300px" });
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHeader(true);
      } else {
        setHeader(false);
      }

      // search

      if (window.scrollY > 800) {
        setSearchActive(true);
      } else {
        setSearchActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setSearchActive]); // Ajout du tableau de dépendances avec setSearchActive

  const redirectToCategoryVehicle = (category: string) => {
    router.push(`/vehicles?category=${category}`);
  };

  return (
    <header
      className={`${
        header || nav
          ? "bg-white shadow-md py-2 "
          : "bg-transparent shadow-none py-4"
      } fixed w-full max-w-[1920px] mx-auto z-[9999] transition-all duration-300`}
    >
      <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <div className="flex justify-between items-center px-4">
          <ScrollLink
            to="home"
            smooth={desktopMode}
            spy={true}
            className="cursor-pointer"
          >
            <div className="relative w-[110px] h-[80px] overflow-hidden ">
              <Image
                src="/Kozua v3.png"
                //src="/kjb.png"
                alt="logo"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </ScrollLink>

          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer xl:hidden"
          >
            {nav ? (
              <BiX className="text-4xl" />
            ) : (
              <BiMenuAltRight className="text-4xl" />
            )}
          </div>
        </div>

        <nav
          className={`${
            nav
              ? "min-h-[70vh] py-8 px-4 xl:py-0 xl:px-0"
              : "max-h-0 xl:max-h-max"
          } flex flex-col w-full bg-white gap-y-6 overflow-hidden font-bold xl:font-medium xl:flex-row
           xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150 text-center 
           xl:text-left text-sm xl:text-[15px] normal-case`}
        >
          <ScrollLink
            className="cursor-pointer"
            to="home"
            activeClass="active"
            smooth={desktopMode}
            spy={true}
          >
            Accueil
          </ScrollLink>
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
          ${open ? "text-yellowkouzua" : "text-black"}
        cursor-pointer border-none`}
                >
                  <span>Automobile</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-[999999]  -mt-4 xl:mt-3 left-1/2  w-screen max-w-xl -translate-x-1/2 transform px-4 sm:px-0 mb-10 xl:mb-0 ">
                    <div className="overflow-hidden  rounded-lg shadow-lg ring-1 ring-black/5 bg-white border  max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                      <div className="flex flex-col lg:flex-row px-7 py-6 gap-8">
                        {/* Vente et achat */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Vente et achat
                          </h3>
                          <div className="flex flex-col gap-4">
                            <a
                              href="/vehicles?condition=Neuf"
                              className="flex flex-col gap-1 text-start rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50"
                            >
                              <span className="text-sm font-medium text-gray-900">
                                Neuf
                              </span>
                              <span className="text-xs text-gray-500">
                                Découvrez nos véhicules neufs au meilleur prix.
                              </span>
                            </a>
                            <a
                              href="/vehicles?condition=Occasion"
                              className="flex flex-col gap-1 text-start rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50"
                            >
                              <span className="text-sm font-medium text-gray-900">
                                Occasion
                              </span>
                              <span className="text-xs text-gray-500">
                                Trouvez des véhicules d&apos;occasion fiables et
                                abordables.
                              </span>
                            </a>
                          </div>
                        </div>
                        {/* Location */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Location
                          </h3>
                          <div className="flex flex-col gap-4">
                            {[
                              {
                                type: "Citadine",
                                icon: (
                                  <FaCar className="text-green-500 text-xl" />
                                ),
                                description: "Idéal pour les trajets en ville.",
                              },
                              {
                                type: "Berline",
                                icon: (
                                  <FaCar className="text-green-500 text-xl" />
                                ),
                                description:
                                  "Profitez du confort pour vos longs trajets.",
                              },
                              {
                                type: "Suv",
                                icon: (
                                  <FaCar className="text-green-500 text-xl" />
                                ),
                                description:
                                  "Polyvalent pour la ville et l'aventure.",
                              },
                              {
                                type: "4x4",
                                icon: (
                                  <FaTruck className="text-red-500 text-xl" />
                                ),
                                description:
                                  "Parfait pour les terrains difficiles.",
                              },
                              {
                                type: "Camionnette",
                                icon: (
                                  <FaTruck className="text-red-500 text-xl" />
                                ),
                                description:
                                  "Solution idéale pour transporter vos marchandises.",
                              },
                            ].map(({ type, icon, description }) => (
                              <button
                                key={type}
                                onClick={(e) => {
                                  e.preventDefault(); // Empêche le comportement par défaut du lien
                                  redirectToCategoryVehicle(type); // Redirige vers la catégorie
                                }}
                                className="flex flex-col gap-1 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium text-gray-900">
                                    {type}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-500 text-start">
                                  {description}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>


                      <div className="flex justify-end px-7 py-5">
                        <a href="/vehicles" className="text-yellowkouzua hover:text-yellowkouzua-dark transition-colors duration-200 cursor-pointer font-bold hover:underline">
                          Voir plus
                        </a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>
          <Popover>
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
          ${open ? "text-yellowkouzua" : "text-black"}
        cursor-pointer border-none`}
                >
                  <span>Immobilier</span>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-[999999]  left-1/2 -mt-4 xl:mt-3  w-screen max-w-xl -translate-x-1/2 transform px-4 sm:px-0 pb-10 xl:pb-0">
                    <div className="overflow-hidden  rounded-lg shadow-lg ring-1 ring-black/5 bg-white border  max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                      <div className="flex flex-col lg:flex-row px-7 py-6 gap-8">
                        {/* Immobilier à Pointe-Noire */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Immobilier à Pointe-Noire
                          </h3>
                          <div className="flex flex-col gap-4">
                            {quartiersPointeNoire.map((quartier) => (
                              <a
                                key={quartier}
                                href={`/estates?city=Pointe-Noire&neighborhood=${quartier}`}
                                className="flex items-center gap-3 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50"
                              >
                                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                                <span className="text-sm font-medium text-gray-900">
                                  {quartier}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Immobilier à Brazzaville */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Immobilier à Brazzaville
                          </h3>
                          <div className="flex flex-col gap-4">
                            {quartiersBrazzaville.map((quartier) => (
                              <a
                                key={quartier}
                                href={`/estates?city=Brazzaville&neighborhood=${quartier}`}
                                className="flex items-center gap-3 rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50"
                              >
                                <FaMapMarkerAlt className="text-green-500 text-xl" />
                                <span className="text-sm font-medium text-gray-900">
                                  {quartier}
                                </span>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end px-7 py-5">
                        <a href="/estates" className="text-yellowkouzua hover:text-yellowkouzua-dark transition-colors duration-200 cursor-pointer font-bold hover:underline">
                          Voir plus
                        </a>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <Link href="https://api.whatsapp.com/send/?phone=242056977474&text&type=phone_number&app_absent=0">
            Contact
          </Link>
          <SearchMobile />
        </nav>
      </div>
    </header>
  );
}

export default Header;
