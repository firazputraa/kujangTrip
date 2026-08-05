import React from "react";
import InputField from "../molecules/Inputfield";
import DestinationCard from "../molecules/Destinationcard";
import profile1 from "../../assets/images/profile1.jpg";
import logoKotaBogor from "../../assets/images/logoKotaBogor.png";

const DAFTAR_KATEGORI_WISATA = [
  "Alam",
  "Kuliner",
  "Budaya",
  "Edukasi",
  "Buatan",
];

const ProfileTemplate = ({
  userData,
  likePlaces = [],
  isLoading,
  isEditing,
  onEditClick,
  onCancelEdit,
  onSaveProfile,
  onInputChange,
  onTagToggle,
  onCardClick,
  onLikeClick,
  onPrintClick,
}) => {
  return (
    <>
      {/* --- KONTEN WEBSITE (Disembunyikan saat print) --- */}
      <div className="print:hidden min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-64 text-xl font-bold text-[#0038FF] animate-pulse">
              Memuat Data Profile...
            </div>
          ) : (
            <>
              {/* Bagian Profil */}
              <section className="bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                <div className="w-full md:w-64 flex flex-col items-center shrink-0">
                  <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 flex flex-col items-center w-full max-w-xs md:max-w-full shadow-sm">
                    <div className="relative w-32 h-32 sm:w-36 sm:h-36">
                      <img
                        src={userData?.profilePic || profile1}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
                      />
                    </div>
                    <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Pengguna KujangTrip
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between w-full">
                  <div className="space-y-6 mb-8 w-full">
                    <div className="flex flex-col w-full">
                      {!isEditing ? (
                        <div className="border-b border-gray-100 pb-3">
                          <label className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wide block mb-1">
                            Nama Pengguna
                          </label>
                          <p className="text-lg md:text-xl font-bold text-gray-800 wrap-break-words">
                            {userData?.name || "-"}
                          </p>
                        </div>
                      ) : (
                        <InputField
                          id="name"
                          name="name"
                          type="text"
                          label="Nama Pengguna"
                          value={userData?.name || ""}
                          onChange={onInputChange}
                          className="w-full"
                          labelClassName="text-base font-bold text-gray-800 mb-1.5 block"
                          inputClassName="!border-gray-300 focus:!border-blue-600 !rounded-xl !px-4 !py-2.5 !text-base md:!text-lg !bg-gray-50 focus:!bg-white !w-full !mt-0 transition-all shadow-sm"
                        />
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      {!isEditing ? (
                        <div className="border-b border-gray-100 pb-3">
                          <label className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wide block mb-1">
                            Alamat Email
                          </label>
                          <p className="text-lg md:text-xl font-bold text-gray-800 wrap-break-words">
                            {userData?.email || "-"}
                          </p>
                        </div>
                      ) : (
                        <InputField
                          id="email"
                          name="email"
                          type="email"
                          label="Alamat Email"
                          value={userData?.email || ""}
                          onChange={onInputChange}
                          className="w-full"
                          labelClassName="text-base font-bold text-gray-800 mb-1.5 block"
                          inputClassName="!border-gray-300 focus:!border-blue-600 !rounded-xl !px-4 !py-2.5 !text-base md:!text-lg !bg-gray-50 focus:!bg-white !w-full !mt-0 transition-all shadow-sm"
                        />
                      )}
                    </div>
                    <div className="pt-2">
                      <label className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-wide block mb-3">
                        {isEditing
                          ? "Klik Kategori untuk Memilih / Menghapus:"
                          : "Kategori Wisata Pilihanmu"}
                      </label>
                      <div className="flex flex-wrap gap-2 sm:gap-2.5">
                        {isEditing ? (
                          DAFTAR_KATEGORI_WISATA.map((kategori) => {
                            const isSelected =
                              userData?.kategoriPilihan?.includes(kategori);
                            return (
                              <button
                                type="button"
                                key={kategori}
                                onClick={() =>
                                  onTagToggle && onTagToggle(kategori)
                                }
                                className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm border transition-all cursor-pointer ${isSelected ? "bg-[#0038FF] text-white border-[#0038FF] shadow-md shadow-blue-500/20" : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"}`}
                              >
                                {isSelected ? `✓ ${kategori}` : `+ ${kategori}`}
                              </button>
                            );
                          })
                        ) : userData?.kategoriPilihan &&
                          userData.kategoriPilihan.length > 0 ? (
                          userData.kategoriPilihan.map((kategori, index) => (
                            <span
                              key={index}
                              className="bg-blue-50 text-[#0038FF] border border-blue-200 px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm shadow-sm tracking-wide"
                            >
                              {kategori}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-400 italic text-sm">
                            Belum ada kategori yang dipilih.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-end items-center gap-3 w-full">
                    {isEditing ? (
                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={onCancelEdit}
                          className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer text-center text-sm md:text-base"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={onSaveProfile}
                          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer text-center text-sm md:text-base shadow-md shadow-green-600/20"
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={onEditClick}
                        className="w-full sm:w-auto bg-[#0038FF] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all cursor-pointer text-center text-sm md:text-base shadow-md shadow-blue-600/20 active:scale-95"
                      >
                        Perbarui
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* Bagian Wisata Disukai */}
              <section className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10">
                <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      Wisata Yang Disukai ❤️
                    </h2>
                    <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-max">
                      {likePlaces?.length || 0} Destinasi Disimpan
                    </span>
                  </div>
                  {/* TOMBOL CETAK */}
                  <button
                    onClick={onPrintClick}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
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
                    Cetak Laporan Profil
                  </button>
                </div>

                {likePlaces && likePlaces.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                    {likePlaces.map((tempat, index) => {
                      const idTempat = tempat.placeId || tempat.id || index;
                      return (
                        <div key={idTempat} className="w-full max-w-sm flex">
                          <DestinationCard
                            title={tempat.place_name || tempat.name}
                            imageUrl={tempat.imageUrl}
                            category={tempat.tag || tempat.kategori}
                            rating={tempat.rating}
                            description={tempat.description}
                            isLiked={true}
                            onDetailClick={() =>
                              onCardClick && onCardClick(idTempat)
                            }
                            onLikeClick={() =>
                              onLikeClick && onLikeClick(idTempat)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 px-4 text-gray-500 font-medium bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
                    <p className="text-lg md:text-xl font-bold text-gray-700 mb-2">
                      Belum ada wisata favoritmu
                    </p>
                    <p className="text-sm text-gray-400 max-w-md mx-auto">
                      Jelajahi destinasi pada halaman pencarian dan tekan ikon
                      hati untuk menyimpannya di sini!
                    </p>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. KERTAS LAPORAN CETAK PDF (Dengan CSS Khusus Tinta/Warna) */}
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
        {/* KOP SURAT (Dipercantik dengan border double) */}
        <div className="border-b-4 border-black mb-1 pb-1">
          <div className="border-b-[1.5px] border-black pb-4 flex items-center justify-between">
            {/* Logo Kiri */}
            <div className="w-24 shrink-0 flex justify-center">
              <img
                src={logoKotaBogor}
                alt="Logo Kota Bogor"
                className="w-20 h-auto object-contain"
              />
            </div>

            {/* Teks Tengah */}
            <div className="flex-1 text-center px-4 text-black">
              <h1 className="text-xl font-bold uppercase tracking-wide leading-snug">
                Pemerintah Kota Bogor
              </h1>
              <h2 className="text-2xl font-bold uppercase tracking-wider leading-snug mb-1">
                Dinas Pariwisata dan Kebudayaan
              </h2>
              <p className="text-sm">
                Jl. Pandu Raya No. 45, Tegal Gundil, Bogor Utara, Kota Bogor,
                Jawa Barat 16121
              </p>
              <p className="text-sm mt-0.5">Telp. 0251 832 8827, Faksimile -</p>
              <p className="text-sm mt-0.5">
                Situs web : https://disparbud.kotabogor.go.id/
              </p>
            </div>

            {/* Spacer Kanan (Agar Teks Benar-benar di Tengah) */}
            <div className="w-24 shrink-0"></div>
          </div>
        </div>

        {/* JUDUL LAPORAN */}
        <div className="text-center mt-6 mb-8">
          <h3 className="text-xl font-bold uppercase underline">
            Laporan Profil & Wisata Disukai
          </h3>
        </div>

        {/* DATA PROFIL */}
        <div className="mb-8 avoid-break">
          <h4 className="font-bold text-md mb-3">A. Data Pengguna</h4>
          <table className="w-full max-w-xl text-left text-sm border-none">
            <tbody>
              <tr>
                <td className="w-48 font-bold border-none py-1 px-0">
                  Nama Pengguna
                </td>
                <td className="border-none py-1 px-0">
                  : {userData?.name || "-"}
                </td>
              </tr>
              <tr>
                <td className="font-bold border-none py-1 px-0">
                  Alamat Email
                </td>
                <td className="border-none py-1 px-0">
                  : {userData?.email || "-"}
                </td>
              </tr>
              <tr>
                <td className="font-bold border-none py-1 px-0 align-top">
                  Preferensi Kategori
                </td>
                <td className="border-none py-1 px-0 align-top">
                  : {userData?.kategoriPilihan?.join(", ") || "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* TABEL WISATA DISUKAI */}
        <div className="mb-10">
          <h4 className="font-bold text-md mb-3">B. Daftar Wisata Disukai</h4>
          {likePlaces && likePlaces.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className="w-12 text-center">No</th>
                  <th>Nama Destinasi</th>
                  <th className="w-32 text-center">Kategori</th>
                  <th className="w-24 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {likePlaces.map((tempat, index) => (
                  <tr
                    key={tempat.placeId || tempat.id || index}
                    className="avoid-break"
                  >
                    <td className="text-center">{index + 1}</td>
                    <td>{tempat.place_name || tempat.name}</td>
                    <td className="text-center">
                      {tempat.tag || tempat.kategori}
                    </td>
                    <td className="text-center">{tempat.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm italic ml-4">
              Pengguna belum menyukai wisata apapun.
            </p>
          )}
        </div>

        {/* RUANG TANDA TANGAN */}
        <div className="mt-10 flex justify-end pr-10 text-black avoid-break">
          <div className="text-center w-64">
            <p className="mb-24">
              Bogor,{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="font-bold underline">Drs. Firdaus, M.Si.</p>
            <p className="text-sm">Kepala Dinas Pariwisata dan Kebudayaan</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTemplate;
