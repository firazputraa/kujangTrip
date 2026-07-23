import React from "react";

const FaqTemplate = ({ faqData, openId, onToggle, isHome }) => {
  return (
    <div
      // Tambahkan relative dan overflow-hidden di sini agar SVG tidak tembus
      className={`relative overflow-hidden bg-white w-full ${
        isHome ? "py-16 md:py-24" : "min-h-screen pt-32 pb-20"
      }`}
    >
      {/* ======================================================== */}
      {/* --- EFEK DEKORASI BACKGROUND (Dari DetailTemplate) --- */}
      {/* ======================================================== */}

      {/* Dekorasi 1: Garis Putus-putus & Pin (Kiri Atas) */}
      <div className="hidden lg:block absolute top-10 -left-10 z-0 pointer-events-none opacity-60">
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
      <div className="hidden lg:block absolute bottom-10 right-10 z-0 pointer-events-none opacity-50 -rotate-12">
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

      {/* Tambahkan relative z-10 di sini agar konten berada di atas SVG */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black mb-4 tracking-tight">
            Pertanyaan yang sering ditanyakan
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto font-medium">
            Masih bingung atau punya kendala? Temukan jawabannya di sini agar
            persiapan liburanmu di Bogor makin lancar
          </p>
        </div>

        {/* Style grid dan item tetap persis seperti yang kamu berikan aslinya */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
          {faqData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="flex flex-col border-[2.5px] border-black bg-white overflow-hidden"
              >
                <button
                  onClick={() => onToggle(faq.id)}
                  className="w-full bg-[#0038FF] text-white flex justify-between items-center p-4 sm:p-5 text-left transition-colors duration-300 hover:bg-blue-800 cursor-pointer outline-none"
                >
                  <span className="font-semibold text-sm sm:text-base md:text-lg pr-4 leading-snug">
                    {faq.question}
                  </span>
                  <span className="shrink-0 text-white flex items-center justify-center">
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-300"
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
                        className="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-300"
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
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 border-t-[2.5px] border-black"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
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
    </div>
  );
};

export default FaqTemplate;
