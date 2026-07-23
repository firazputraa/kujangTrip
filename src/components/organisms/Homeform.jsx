import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Input from "../atoms/Input";
import Button from "../atoms/Buttons";

const HomeForm = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSearch = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  const cleanQuery = query.trim();

  if (!cleanQuery) {
    setError("Harus masukan inputan kata kunci!");
    setIsLoading(false);
    return;
  }
  setIsLoading(false);
  setQuery("");
  navigate(`/search?keyword=${encodeURIComponent(cleanQuery)}`);
  await new Promise((resolve) => setTimeout(resolve, 1500));
};

  return (
    <div className="w-xs md:w-full max-w-md md:max-w-sm lg:max-w-lg mt-2">
      {error && (
        <p className="text-red-500 mb-2 text-sm font-medium text-center">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full p-1 md:py-1 md:px-2 shadow-lg border border-gray-200 h-10 md:h-10 lg:h-12"
      >
        <div className="pl-3 md:pl-4 pr-1 md:pr-2 text-gray-500 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <Input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Masukan Lokasi..."
          disabled={isLoading}
          className="flex-1 border-none! shadow-none! mt-0! bg-transparent! focus:ring-0! text-sm md:text-base px-2 rounded-none! py-2!"
        />
        <Button
          type="submit"
          disabled={isLoading}
          styles="h-full flex items-center justify-center bg-[#0061FF] hover:bg-blue-700 text-white font-bold rounded-full! transition-all shadow-md px-2 md:px-4 lg:px-6 shrink-0 text-sm md:text-lg py-0"
        >
          {isLoading ? "Mencari..." : "Cari"}
        </Button>
      </form>
    </div>
  );
};

export default HomeForm;
