import React from "react";
import Card from "../molecules/Destinationcard";

const SearchTemplate = ({
  searchQuery,
  onSearchChange,
  onSubmitSearch,
  searchResults,
  isLoading,
  hasSearched,
  likedPlaces,
  onLikeClick,
  onCardClick,
  onPrintClick,
}) => {
  return (
    <>
      {/* --- KONTEN WEBSITE (Disembunyikan saat print) --- */}
      <div className="print:hidden relative overflow-hidden min-h-screen bg-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Dekorasi 1-4 Tetap seperti aslinya */}
        <div className="hidden lg:block absolute top-20 -left-10 z-0 pointer-events-none opacity-60">
          <svg
            width="350"
            height="300"
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
        <div className="hidden lg:block absolute top-[40%] -right-8 z-0 pointer-events-none opacity-40 rotate-12">
          <svg
            width="200"
            height="200"
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
        <div className="hidden lg:block absolute bottom-[15%] -left-16 z-0 pointer-events-none opacity-50 -rotate-6">
          <svg
            width="400"
            height="300"
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
        <div className="hidden lg:block absolute bottom-10 right-10 z-0 pointer-events-none opacity-50 -rotate-12">
          <svg
            width="200"
            height="200"
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

        <div className="relative z-10 max-w-7xl mx-auto mt-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-2">
              Pilihan Terbaik <span className="text-[#003BFF]">Untukmu</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Destinasi yang disesuaikan dengan pencarian Anda
            </p>
            <form
              onSubmit={onSubmitSearch}
              className="max-w-2xl mx-auto relative flex items-center border-2 border-gray-900 rounded-xl overflow-hidden bg-white mb-6 shadow-sm"
            >
              <div className="pl-4 pr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Masukan Lokasi..."
                className="w-full py-3 px-2 text-gray-700 outline-none text-base md:text-lg bg-transparent"
              />
              <div className="pr-2 py-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-[#003BFF] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-70"
                >
                  {isLoading ? "..." : "Cari"}
                </button>
              </div>
            </form>

            {/* TOMBOL CETAK PDF */}
            {searchResults.length > 0 && !isLoading && (
              <div className="max-w-2xl mx-auto flex justify-end mb-10">
                <button
                  onClick={onPrintClick}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  Cetak Hasil Pencarian
                </button>
              </div>
            )}
          </div>

          <div>
            {isLoading ? (
              <p className="text-center font-semibold animate-pulse text-[#003BFF] text-xl mt-10">
                Mencari destinasi terbaik...
              </p>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {searchResults.map((tempat) => (
                  <div
                    key={tempat.placeId}
                    onClick={() => onCardClick(tempat.placeId)}
                    className="w-full max-w-sm flex cursor-pointer transition-transform duration-300 hover:-translate-y-1 bg-white/60 backdrop-blur-sm rounded-xl"
                  >
                    <Card
                      title={tempat.place_name}
                      imageUrl={tempat.imageUrl}
                      category={tempat.tag}
                      rating={tempat.rating}
                      address={tempat.address}
                      description={tempat.description}
                      isLiked={likedPlaces.includes(tempat.placeId)}
                      onLikeClick={(e) => {
                        e.stopPropagation();
                        onLikeClick(tempat.placeId);
                      }}
                      onDetailClick={(e) => {
                        e.stopPropagation();
                        onCardClick(tempat.placeId);
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : hasSearched ? (
              <div className="text-center py-20 text-gray-500 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 max-w-2xl mx-auto mt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-xl font-medium">Wisata tidak ditemukan</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. KERTAS LAPORAN CETAK PDF */}
      {/* ======================================================== */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 20mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Times New Roman', Times, serif; }
          .avoid-break { page-break-inside: avoid; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { border: 1px solid #000; padding: 8px 12px; }
          th { background-color: #f3f4f6 !important; font-weight: bold; }
        }
      `}</style>

      <div className="hidden print:block w-full bg-white text-black font-serif">
        {/* KOP SURAT */}
        <div className="border-b-4 border-black mb-1 pb-1">
          <div className="border-b-[1px] border-black pb-4 flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold uppercase tracking-wider leading-tight">
              KujangTrip - Sistem Rekomendasi Wisata
            </h1>
            <h2 className="text-lg font-bold uppercase tracking-wide leading-tight">
              Dinas Pariwisata dan Kebudayaan Kota Bogor
            </h2>
            <p className="text-sm mt-2">
              Jl. Pandu Raya No.45, Bantarjati, Kec. Bogor Utara, Kota Bogor,
              Jawa Barat 16153
            </p>
            <p className="text-sm">
              Telepon: (0251) 8322055 | Email: info@kujangtrip.com
            </p>
          </div>
        </div>

        {/* JUDUL LAPORAN */}
        <div className="text-center mt-6 mb-8">
          <h3 className="text-xl font-bold uppercase underline mb-1">
            Laporan Hasil Pencarian Wisata
          </h3>
          <p className="italic text-sm">
            Kata Kunci: "{searchQuery || "Seluruh Destinasi"}"
          </p>
        </div>

        {/* TABEL HASIL PENCARIAN */}
        <div className="mb-10">
          {searchResults && searchResults.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className="w-12 text-center">No</th>
                  <th className="w-1/4">Nama Destinasi</th>
                  <th className="w-24 text-center">Kategori</th>
                  <th className="w-20 text-center">Rating</th>
                  <th>Alamat Lengkap</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((tempat, index) => (
                  <tr key={tempat.placeId || index} className="avoid-break">
                    <td className="text-center align-top">{index + 1}</td>
                    <td className="align-top font-bold">
                      {tempat.place_name || tempat.name}
                    </td>
                    <td className="text-center align-top">
                      {tempat.tag || tempat.kategori}
                    </td>
                    <td className="text-center align-top">{tempat.rating}</td>
                    <td className="align-top text-xs leading-relaxed">
                      {tempat.address}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm italic text-center border border-black py-10">
              Data tidak ditemukan.
            </p>
          )}
        </div>

        {/* RUANG TANDA TANGAN */}
        <div className="mt-16 flex justify-end pr-10 text-black avoid-break">
          <div className="text-center w-64">
            <p className="mb-24">
              Bogor,{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="font-bold underline">
              Muhamad Firaz Putra Sri Ardhya
            </p>
            <p className="text-sm">Administrator KujangTrip</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchTemplate;
