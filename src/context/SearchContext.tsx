"use client";

import React, { createContext, useContext, useState } from "react";

// Type pour le contexte
type SearchContextType = {
  searchActive: boolean;
  setSearchActive: (value: boolean) => void;
};

// Création du contexte avec une valeur par défaut
export const SearchContext = createContext<SearchContextType>({
  searchActive: false,
  setSearchActive: () => {},
});

// Provider component
export function SearchContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchActive, setSearchActive] = useState(false);

  return <SearchContext.Provider value={{
    searchActive,
    setSearchActive,
  }}>{children}</SearchContext.Provider>;
}

export const useSearchContext = () => useContext(SearchContext);