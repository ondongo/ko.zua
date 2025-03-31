"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

function QuerySelection({ query, setQuery }: { query: string, setQuery: React.Dispatch<React.SetStateAction<string>> }) {

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-center items-center w-full h-full gap-2.5 py-1 ">
        <input
          type="text"
          className="w-full h-[40px] ml-6 pl-3 rounded-lg placeholder-black placeholder-opacity-50 font-medium focus:outline-none focus:ring-1 focus:ring-yellowkouzua focus:border-yellowkouzua"
          placeholder="Tapez pour rechercher  ..."
          value={query}
          onChange={handleInputChange}
        />
        {query && (
          <div className="absolute inset-y-0 right-1 flex items-center">
            <button
              onClick={handleClear}
              className="text-white bg-yellowkouzua rounded-full p-1"
              aria-label="Clear input"
            >
              <AiOutlineClose />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuerySelection;
