import React from "react";
import InputField from "../molecules/Inputfield";
import DestinationCard from "../molecules/Destinationcard";
import profile1 from "../../assets/images/profile1.jpg";

const DAFTAR_KATEGORI_WISATA = [
  "Alam",
  "Kuliner",
  "Budaya",
  "Edukasi",
  "Buatan"
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
}) => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
        {isLoading ? (
          <div className="flex justify-center items-center h-64 text-xl font-bold text-[#0038FF] animate-pulse">
            Memuat Data Profile...
          </div>
        ) : (
          <>
            <section className="bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Kolom Kiri: Foto Avatar */}
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
                              className={`px-4 py-1.5 rounded-full font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[#0038FF] text-white border-[#0038FF] shadow-md shadow-blue-500/20"
                                  : "bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200"
                              }`}
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
            
            <section className="bg-white shadow-md border border-gray-200 rounded-2xl p-6 sm:p-8 md:p-10">
              <div className="border-b border-gray-200 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Wisata Yang Disukai ❤️
                </h2>
                <span className="text-xs sm:text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full w-max">
                  {likePlaces?.length || 0} Destinasi Disimpan
                </span>
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
  );
};

export default ProfileTemplate;
