import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../molecules/Destinationcard";
import heroDashboard from "../../assets/images/heroDashboard.png";
import HomeForm from "../organisms/Homeform";
import TagSelectionPopup from "../organisms/Popuptag";
import defaultImage from "../../assets/images/default-gambar.svg";
import logoKotaBogor from "../../assets/images/logoKotaBogor.png";

const faqDataList = [
  {
    id: 1,
    question: "Bagaimana cara sistem memberikan rekomendasi wisata?",
    answer:
      "Sistem KujangTrip menggunakan teknologi rekomendasi pintar (Machine Learning) yang mencocokkan kategori preferensi yang Anda pilih (seperti Alam, Budaya, Kuliner) dengan rating dan popularitas destinasi wisata di Kota Bogor.",
  },
  {
    id: 2,
    question: "Apakah saya bisa mengubah preferensi wisata jika bosan?",
    answer:
      "Tentu saja! Anda dapat kapan saja pergi ke halaman Profile, lalu mengubah atau memperbarui tag preferensi wisata Anda. Rekomendasi di beranda akan otomatis menyesuaikan dengan pilihan baru Anda.",
  },
  {
    id: 3,
    question:
      "Bagaimana cara menyimpan destinasi wisata yang ingin saya kunjungi nanti?",
    answer:
      "Anda cukup menekan ikon hati (Like) yang ada di setiap kartu destinasi wisata. Destinasi tersebut akan otomatis tersimpan dan dapat Anda lihat kembali kapan saja di halaman Profile Anda.",
  },
  {
    id: 4,
    question:
      "Apakah rekomendasi yang diberikan untuk setiap pengguna berbeda?",
    answer:
      "Ya, sangat berbeda. Rekomendasi yang muncul di halaman beranda Anda disesuaikan secara personal (Personalized) berdasarkan preferensi unik yang Anda pilih saat mendaftar atau mengedit profil.",
  },
  {
    id: 5,
    question:
      "Bagaimana KujangTrip menjaga keamanan data pribadi dan preferensi wisata saya?",
    answer:
      "Kami menggunakan enkripsi keamanan standar dan token JWT (JSON Web Token) untuk melindungi sesi Anda. Data preferensi Anda hanya digunakan secara internal oleh sistem untuk memberikan rekomendasi, dan tidak dibagikan ke pihak ketiga.",
  },
  {
    id: 6,
    question:
      "Apakah rekomendasi dari KujangTrip menjamin 100% kepuasan liburan saya?",
    answer:
      "Meskipun sistem kami berusaha memberikan rekomendasi terbaik berdasarkan data dan algoritma, kepuasan liburan sangat bergantung pada kondisi di lapangan (seperti cuaca, kepadatan pengunjung). Namun, kami yakin KujangTrip akan sangat membantu mempermudah perencanaan liburan Anda!",
  },
];

const HomeTemplate = ({
  rekomendasi = [],
  isLoading,
  populer = [],
  isLoadingPopuler,
  showPopup,
  onClosePopup,
  onSubmitPreferences,
  onCardClick,
  likedPlaces = [],
  onLikeClick,
  onPrintClick,
}) => {
  const [openId, setOpenId] = useState(null);
  const handleToggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      <TagSelectionPopup
        isOpen={showPopup}
        onClose={onClosePopup}
        onSubmit={onSubmitPreferences}
      />

      {/* ======================================================== */}
      {/* 1. KONTEN WEBSITE NORMAL */}
      {/* ======================================================== */}
      <div className="print:hidden w-full bg-white relative">
        <button
          onClick={onPrintClick}
          title="Cetak Laporan Rekomendasi & Populer"
          className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-3 transition-transform hover:scale-105 group"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            ></path>
          </svg>
          <span className="font-bold hidden group-hover:block overflow-hidden whitespace-nowrap pr-2">
            Cetak PDF
          </span>
        </button>

        {/* SECTION HERO */}
        <section className="min-h-screen relative">
          <img
            src={heroDashboard}
            alt="heroImage"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4">
            <div className="w-full max-w-3xl text-center flex flex-col items-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                Temukan Bogor, Sesuai Cara Kamu!
              </h1>
              <p className="text-base sm:text-lg md:text-md lg:text-xl drop-shadow-md">
                Rekomendasi perjalanan personal berdasarkan gaya dan preferensi
                kamu
              </p>
              <HomeForm />
            </div>
          </div>
        </section>

        {/* SECTION REKOMENDASI UNTUKMU */}
        <section className="relative pt-20 pb-16 overflow-hidden">
          <div className="pointer-events-none absolute top-10 right-[-5%] w-72 h-72 text-[#003BFF] opacity-10 z-0 hidden lg:block">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M12 21C16 16.8 19 12.8 19 9C19 5.13401 15.866 2 12 2C8.13401 2 5 5.13401 5 9C5 12.8 8 16.8 12 21Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="pointer-events-none absolute bottom-10 left-[-5%] w-42 h-42 text-[#003BFF] opacity-15 z-0 hidden lg:block">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="relative z-10 mx-5 md:mx-10 lg:mx-20">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900">
              Rekomendasi <span className="text-[#0061FF]">Untukmu</span>
            </h2>
            <p className="font-medium text-xs md:text-sm lg:text-lg text-gray-600 mb-8">
              Temukan wisata terbaik yang diracik khusus sesuai dengan
              preferensimu
            </p>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="font-semibold animate-pulse text-lg text-[#003BFF]">
                  Meracik rekomendasi wisata terbaik untukmu...
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
                  {rekomendasi && rekomendasi.length > 0 ? (
                    rekomendasi.slice(0, 8).map((tempat, index) => {
                      const idTempat = tempat.placeId || tempat.id || index;
                      return (
                        <div
                          key={idTempat}
                          className="w-full max-w-sm flex cursor-pointer transition-transform duration-300 hover:-translate-y-1 bg-white/60 backdrop-blur-sm rounded-xl"
                          onClick={() => onCardClick && onCardClick(idTempat)}
                        >
                          <Card
                            title={tempat.place_name || tempat.name}
                            imageUrl={tempat.imageUrl}
                            category={tempat.tag || tempat.kategori}
                            rating={tempat.rating}
                            address={tempat.address}
                            description={tempat.description}
                            isLiked={likedPlaces.includes(idTempat)}
                            onLikeClick={(e) => {
                              e.stopPropagation();
                              onLikeClick && onLikeClick(idTempat);
                            }}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <p className="col-span-full text-center font-medium text-gray-500 py-20">
                      Belum ada rekomendasi yang sesuai...
                    </p>
                  )}
                </div>
                {rekomendasi && rekomendasi.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <Link
                      to="/search"
                      className="bg-blue-50 hover:bg-[#0038FF] text-[#0038FF] hover:text-white border border-blue-200 hover:border-[#0038FF] font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-sm flex items-center gap-2.5 group cursor-pointer"
                    >
                      <span>Lihat Semua</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-lg">
                        →
                      </span>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* SECTION WISATA POPULER */}
        <section className="relative pt-20 pb-16 bg-slate-50 overflow-hidden">
          <div className="pointer-events-none absolute top-5 left-[-2%] w-80 h-80 text-[#003BFF] opacity-10 z-0 -rotate-12 hidden lg:block">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <rect
                x="3"
                y="8"
                width="18"
                height="13"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 8V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M10 12V17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M14 12V17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="relative z-10 mb-6 mx-5 md:mx-10 lg:mx-20">
            <h2 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-900">
              Wisata <span className="text-[#0061FF]">Populer</span>
            </h2>
            <p className="font-medium text-xs md:text-sm lg:text-lg text-gray-500 mt-1">
              Destinasi wisata favorit yang paling banyak dikunjungi oleh
              pelancong di Kota Bogor.
            </p>
          </div>
          <div className="relative z-10 mx-5 md:mx-10 lg:mx-20">
            {isLoadingPopuler ? (
              <div className="flex justify-center items-center h-64">
                <p className="font-semibold animate-pulse text-lg text-[#003BFF]">
                  Memuat destinasi wisata populer...
                </p>
              </div>
            ) : populer && populer.length >= 5 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-125">
                <div
                  className="rounded-2xl h-72 md:h-full cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
                  onClick={() =>
                    onCardClick &&
                    onCardClick(populer[0].placeId || populer[0].id)
                  }
                >
                  <div className="relative w-full h-full group">
                    <img
                      src={populer[0].imageUrl}
                      alt={populer[0].place_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                    <div className="absolute bottom-0 w-full bg-linear-to-t from-black/90 via-black/50 to-transparent p-6 text-white flex flex-col justify-end h-3/4">
                      <span className="bg-[#003BFF] text-xs font-bold px-3.5 py-1.5 rounded-full mb-3 w-max shadow-sm">
                        {populer[0].tag || populer[0].kategori}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                        {populer[0].place_name || populer[0].name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-200 mt-1 truncate">
                        {populer[0].address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 h-125 md:h-full">
                  {populer.slice(1, 5).map((tempat, index) => {
                    const idPopuler = tempat.placeId || tempat.id || index;
                    return (
                      <div
                        key={idPopuler}
                        className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all duration-300"
                        onClick={() => onCardClick && onCardClick(idPopuler)}
                      >
                        <img
                          src={tempat.imageUrl}
                          alt={tempat.place_name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultImage;
                          }}
                        />
                        <div className="absolute bottom-0 w-full bg-linear-to-t from-black/90 via-black/40 to-transparent p-4 text-white flex flex-col justify-end h-2/3">
                          <span className="bg-[#003BFF] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full mb-1.5 w-max shadow-sm">
                            {tempat.tag || tempat.kategori}
                          </span>
                          <h4 className="text-sm sm:text-base font-bold truncate">
                            {tempat.place_name || tempat.name}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 rounded-2xl border border-gray-200">
                <p className="font-medium text-gray-500">
                  Data wisata populer belum tersedia secara penuh saat ini.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SECTION FAQ */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          <div className="pointer-events-none absolute top-10 right-[-2%] w-60 h-60 text-[#003BFF] opacity-10 z-0 rotate-12 hidden lg:block">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M16.2426 7.75736L14.1213 14.1213L7.75736 16.2426L9.87868 9.87868L16.2426 7.75736Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L12.01 12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="pointer-events-none absolute bottom-10 left-[-2%] w-52 h-52 text-[#003BFF] opacity-10 z-0 -rotate-12 hidden lg:block">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M0 80 C 30 50, 50 80, 80 50"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="6 6"
              />
              <path
                d="M80 50 C80 40, 70 40, 70 50 C70 60, 80 75, 80 75 C80 75, 90 60, 90 50 C90 40, 80 40, 80 50Z"
                fill="currentColor"
              />
              <circle cx="80" cy="47" r="3" fill="white" />
            </svg>
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
                Pertanyaan yang sering ditanyakan
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
                Masih bingung atau punya kendala? Temukan jawabannya di sini
                agar persiapan liburanmu di Bogor makin lancar
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
              {faqDataList.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="flex flex-col border-[2.5px] border-black bg-white overflow-hidden"
                  >
                    <button
                      onClick={() => handleToggleFaq(faq.id)}
                      className="w-full bg-[#0038FF] text-white flex justify-between items-center p-4 sm:p-5 text-left transition-colors duration-300 hover:bg-blue-800 cursor-pointer outline-none"
                    >
                      <span className="font-semibold text-sm sm:text-base md:text-lg pr-4 leading-snug">
                        {faq.question}
                      </span>
                      <span className="shrink-0 text-white flex items-center justify-center">
                        {isOpen ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M20 12H4"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 sm:h-8 sm:w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 border-t-[2.5px] border-black" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="p-4 sm:p-5 text-gray-900 text-sm sm:text-base leading-relaxed font-medium">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* ======================================================== */}
      {/* 2. KERTAS LAPORAN CETAK PDF (Desain Rapi 1 Halaman) */}
      {/* ======================================================== */}
      <style>{`
        @media print {
          @page { size: A4 portrait; margin: 15mm; }
          
          /* --- TAMBAHKAN BARIS INI UNTUK MENGHILANGKAN EFEK ABU-ABU BAWAH --- */
          html, body, #root { background-color: #FFFFFF !important; }
          
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: 'Times New Roman', Times, serif; }
          .avoid-break { page-break-inside: avoid; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          th, td { border: 1px solid #000; padding: 6px 10px; font-size: 12px; }
          th { background-color: #f3f4f6 !important; font-weight: bold; }
        }
      `}</style>

      <div className="hidden print:block w-full bg-white text-black font-serif">
        {/* KOP SURAT */}
        <div className="border-b-4 border-black mb-1 pb-1">
          <div className="border-b-[1.5px] border-black pb-3 flex items-center justify-between">
            <div className="w-20 shrink-0 flex justify-center">
              <img
                src={logoKotaBogor}
                alt="Logo Kota Bogor"
                className="w-16 h-auto object-contain"
              />
            </div>
            <div className="flex-1 text-center px-4 text-black">
              <h1 className="text-lg font-bold uppercase tracking-wide leading-snug">
                Pemerintah Kota Bogor
              </h1>
              <h2 className="text-xl font-bold uppercase tracking-wider leading-snug mb-1">
                Dinas Pariwisata dan Kebudayaan
              </h2>
              <p className="text-xs">
                Jl. Pandu Raya No. 45, Tegal Gundil, Bogor Utara, Kota Bogor,
                Jawa Barat 16121
              </p>
              <p className="text-xs mt-0.5">Telp. 0251 832 8827, Faksimile -</p>
              <p className="text-xs mt-0.5">
                Situs web : https://disparbud.kotabogor.go.id/
              </p>
            </div>
            <div className="w-20 shrink-0"></div>
          </div>
        </div>

        {/* JUDUL LAPORAN */}
        <div className="text-center mt-5 mb-5">
          <h3 className="text-lg font-bold uppercase underline mb-1">
            Laporan Rekomendasi & Destinasi Populer
          </h3>
        </div>

        {/* TABEL REKOMENDASI (TOP-N) */}
        <div className="mb-6 avoid-break">
          <h4 className="font-bold text-sm mb-2">
            A. Top Rekomendasi Wisata Personal
          </h4>
          {rekomendasi && rekomendasi.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className="w-10 text-center">No</th>
                  <th>Nama Destinasi</th>
                  <th className="w-28 text-center">Kategori</th>
                  <th className="w-16 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {rekomendasi.slice(0, 10).map((tempat, index) => (
                  <tr key={tempat.placeId || index} className="avoid-break">
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
            <p className="text-xs italic ml-4">
              Belum ada rekomendasi yang tersedia.
            </p>
          )}
        </div>

        {/* TABEL POPULER */}
        <div className="mb-6 avoid-break">
          <h4 className="font-bold text-sm mb-2">B. Top 5 Destinasi Populer</h4>
          {populer && populer.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th className="w-16 text-center">Peringkat</th>
                  <th>Nama Destinasi</th>
                  <th className="w-28 text-center">Kategori</th>
                  <th className="w-16 text-center">Rating</th>
                </tr>
              </thead>
              <tbody>
                {populer.slice(0, 5).map((tempat, index) => (
                  <tr key={tempat.placeId || index} className="avoid-break">
                    <td className="text-center font-bold">#{index + 1}</td>
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
            <p className="text-xs italic ml-4">
              Data tempat wisata populer belum tersedia.
            </p>
          )}
        </div>

        {/* RUANG TANDA TANGAN */}
        <div className="mt-8 flex justify-end pr-8 text-black avoid-break">
          <div className="text-center w-56">
            <p className="mb-16 text-sm">
              Bogor,{" "}
              {new Date().toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p className="font-bold underline text-sm">Drs. Firdaus, M.Si</p>
            <p className="text-xs">Kepala Dinas Pariwisata dan Kebudayaan</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTemplate;
