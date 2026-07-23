import React, { useState } from "react";
import FaqTemplate from "../components/templates/Faqtemplate";

const FaqPage = ({ isHome = false }) => {
  const [openId, setOpenId] = useState(null);

  const faqData = [
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

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <FaqTemplate
      faqData={faqData}
      openId={openId}
      onToggle={handleToggle}
      isHome={isHome}
    />
  );
};

export default FaqPage;
