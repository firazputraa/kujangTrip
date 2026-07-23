import React from "react";

const AboutTemplate = () => {
  return (
    <div className="w-full min-h-screen bg-white flex items-center justify-center pt-28 pb-20 px-5 sm:px-8 lg:px-10">
      <div className="max-w-5xl w-full mx-auto bg-white p-6 sm:p-10 md:p-16 rounded-xl">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-1 md:mb-2 tracking-wide">
            ketahui lebih lanjut
          </h3>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black tracking-tight">
            Tentang<span className="text-[#0038FF] italic">Kami</span>
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl text-gray-900 leading-relaxed md:leading-loose text-justify font-medium">
            Kota Bogor menyimpan ratusan destinasi wisata menakjubkan, mulai
            dari keasrian ruang terbuka hijau, kekayaan sejarah, hingga ragam
            kuliner legendaris. Namun, dengan melimpahnya pilihan, merencanakan
            perjalanan yang tepat sering kali membingungkan dan memakan waktu.
            Kujang Trip hadir sebagai platform rujukan pariwisata digital yang
            dirancang khusus untuk memetakan dan menyajikan keindahan Kota Bogor
            secara terpusat, interaktif, dan mudah diakses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutTemplate;
