import React from "react";
import Card from "../molecules/Destinationcard";
import LeafletMap from "../molecules/LeafletMap";

const DetailTemplate = ({
  place,
  similarPlaces,
  isLoading,
  isLiked,
  onLikeClick,
  onCardClick,
}) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-[#0038FF] rounded-full animate-spin"></div>
          <p className="text-lg font-bold text-[#0038FF] animate-pulse">
            Memuat detail wisata...
          </p>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xl font-semibold text-gray-500">
          Wisata tidak ditemukan.
        </p>
      </div>
    );
  }

  return (
    // WRAPPER UTAMA: relative, overflow-hidden agar dekorasi yang keluar layar terpotong rapi
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-50">
      <div className="hidden lg:block absolute top-70 -left-10 z-0 pointer-events-none opacity-60">
        <svg
          width="250"
          height="200"
          viewBox="0 0 250 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-20 150 C 50 180, 100 50, 200 80"
            stroke="#cbd5e1"
            strokeWidth="3"
            strokeDasharray="8 8"
          />
          <path
            d="M200 80 C200 65, 185 65, 185 80 C185 95, 200 115, 200 115 C200 115, 215 95, 215 80 C215 65, 200 65, 200 80Z"
            fill="#0038FF"
            opacity="0.8"
          />
          <circle cx="200" cy="76" r="5" fill="white" />
        </svg>
      </div>

      {/* Dekorasi 2: Koper Travel (Kanan Tengah) */}
      <div className="hidden lg:block absolute top-[35%] -right-8 z-0 pointer-events-none opacity-40 rotate-12">
        <svg
          width="140"
          height="140"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="1.2"
        >
          <rect x="5" y="8" width="14" height="12" rx="2" fill="#e2e8f0" />
          <path d="M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
          <path d="M8 12h8M8 16h8" stroke="#cbd5e1" />
          <circle cx="10" cy="14" r="1" fill="#0038FF" stroke="none" />
        </svg>
      </div>

      {/* Dekorasi 3: Pesawat Kertas & Garis Jalur (Kiri Bawah) */}
      <div className="hidden lg:block absolute bottom-[25%] -left-16 z-0 pointer-events-none opacity-50 -rotate-6">
        <svg
          width="300"
          height="200"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 180 C 150 150, 150 50, 250 80"
            stroke="#cbd5e1"
            strokeWidth="3"
            strokeDasharray="8 8"
          />
          <path
            d="M250 80 L230 65 L240 85 L230 100 Z"
            fill="#0038FF"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Dekorasi 4: Pin Lokasi Kecil (Kanan Bawah) */}
      <div className="hidden lg:block absolute bottom-40 right-10 z-0 pointer-events-none opacity-50 -rotate-12">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 80 C 30 50, 50 80, 80 50"
            stroke="#cbd5e1"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <path
            d="M80 50 C80 40, 70 40, 70 50 C70 60, 80 75, 80 75 C80 75, 90 60, 90 50 C90 40, 80 40, 80 50Z"
            fill="#ef4444"
            opacity="0.8"
          />
          <circle cx="80" cy="47" r="3" fill="white" />
        </svg>
      </div>
      {/* ======================================================== */}

      {/* KONTEN UTAMA: Diberi "relative z-10" agar selalu berada di atas ornamen dekorasi */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 mt-16 md:mt-24">
        {/* 1. HEADER SECTION */}
        <div className="flex justify-between items-start gap-4 sm:gap-6 mb-8 md:mb-10">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 tracking-tight">
              {place.place_name}
            </h1>
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#0038FF] border border-blue-200 rounded-full text-xs sm:text-sm font-bold tracking-wide mb-3 sm:mb-4 shadow-sm">
              {place.tag}
            </span>
            <div className="flex items-start gap-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 mt-0.5 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl font-medium">
                {place.address}
              </p>
            </div>
          </div>

          {/* Tombol Like */}
          <button
            onClick={onLikeClick}
            className={`shrink-0 p-3 md:p-4 rounded-full border transition-all duration-300 shadow-sm active:scale-90 group flex items-center justify-center ${
              isLiked
                ? "bg-red-50 border-red-200 hover:bg-red-100"
                : "bg-white border-gray-200 hover:border-red-200 hover:bg-red-50"
            }`}
            aria-label="Like Place"
          >
            {isLiked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-red-500 fill-current group-hover:scale-110 transition-transform duration-300"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 text-gray-400 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 2. HERO IMAGE SECTION */}
        <div className="w-full h-64 sm:h-80 md:h-110 lg:h-125 rounded-3xl overflow-hidden mb-12 shadow-lg relative group border border-gray-100">
          <img
            src={place.imageUrl}
            alt={place.place_name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/src/assets/images/default-gambar.svg";
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>

        <div className="flex flex-col gap-8 md:gap-10 mb-16">
          {/* 3. DESKRIPSI SECTION */}
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 flex items-center gap-3">
              <span className="w-2.5 h-8 bg-[#0038FF] rounded-full"></span>
              Deskripsi Destinasi
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-loose md:leading-[2.2] text-justify font-medium">
              {place.description}
            </p>
          </div>

          {/* 4. MAP & BUTTON SECTION */}
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 flex items-center gap-3">
                <span className="w-2.5 h-8 bg-[#0038FF] rounded-full"></span>
                Lokasi Peta
              </h2>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${place.latitude},${place.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#0038FF] hover:bg-blue-800 text-white font-bold py-3.5 px-7 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Menuju Lokasi
              </a>
            </div>

            <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-inner relative z-0">
              <LeafletMap
                lat={place.latitude}
                lng={place.longitude}
                placeName={place.place_name}
              />
            </div>
          </div>
        </div>

        {/* 5. SIMILAR PLACES SECTION */}
        {similarPlaces && similarPlaces.length > 0 && (
          <div className="bg-gray-50 p-6 sm:p-8 md:p-10 rounded-3xl border border-gray-200 shadow-sm">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                Mungkin Kamu Suka
              </h2>
              <p className="text-gray-500 font-medium text-sm sm:text-base">
                Rekomendasi destinasi wisata serupa yang memiliki karakteristik
                konten mirip.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
              {similarPlaces.map((simPlace) => (
                <div
                  key={simPlace.placeId}
                  onClick={() => onCardClick(simPlace.placeId)}
                  className="cursor-pointer w-full max-w-sm flex transition-transform duration-300 hover:-translate-y-1"
                >
                  <Card
                    title={simPlace.place_name}
                    imageUrl={simPlace.imageUrl}
                    category={simPlace.tag}
                    rating={simPlace.rating}
                    address={simPlace.address}
                    description={simPlace.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTemplate;
