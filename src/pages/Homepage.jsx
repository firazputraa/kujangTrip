import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import Swal from "sweetalert2"; 

import HomeTemplate from "../components/templates/Hometemplate";
import dataWisata from "../data/dataset_wisata_gabungan_cleaned_final_1.2.json";

const Homepage = () => {
  const [rekomendasi, setRekomendasi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [populer, setPopuler] = useState([]);
  const [isLoadingPopuler, setIsLoadingPopuler] = useState(false);
  const [likedPlaces, setLikedPlaces] = useState([]);

  const { isLoggedIn, token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchRekomendasi = async () => {
    if (!isLoggedIn || !token) {
      setRekomendasi([]);
      return;
    }

    setIsLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      let userTags = [];
      try {
        const resUser = await axios.get(
          "http://localhost:5001/users/profile",
          config,
        );
        const profileData = resUser.data?.data || resUser.data || {};
        userTags = profileData.preferredTags || profileData.preferences || [];
      } catch (errProfile) {
        if (errProfile.response?.status === 401) {
          console.warn(
            "Masa berlaku token habis. Mengeluarkan sesi pengguna...",
          );
          if (logout) logout();
          setRekomendasi(dataWisata.slice(0, 10));
          setIsLoading(false);
          return;
        }
        console.warn("Gagal membaca profil pengguna:", errProfile);
      }

      const normalizedUserTags = Array.isArray(userTags)
        ? userTags.map((t) => String(t).toLowerCase().trim()).filter(Boolean)
        : [];

      let outputDariModelML = [];
      try {
        const responseML = await axios.get(
          "http://localhost:5001/places/recommendations",
          config,
        );
        outputDariModelML = responseML.data?.data || [];
      } catch (errML) {
        if (errML.response?.status === 401) {
          if (logout) logout();
          setRekomendasi(dataWisata.slice(0, 10));
          setIsLoading(false);
          return;
        }
        console.warn("API ML tidak merespons, beralih ke filter lokal...");
      }

      if (outputDariModelML.length > 0) {
        const hasilML = outputDariModelML
          .map((itemML) => {
            const idDariML = itemML.placeId || itemML.id || itemML.Place_Id;
            return dataWisata.find(
              (tempat) =>
                String(tempat.placeId) === String(idDariML) ||
                String(tempat.Place_Id) === String(idDariML) ||
                String(tempat.id) === String(idDariML),
            );
          })
          .filter(Boolean);

        if (hasilML.length > 0 && normalizedUserTags.length > 0) {
          const mlSesuaiTag = hasilML.filter((tempat) => {
            const tagWisata = String(tempat.tag || tempat.kategori || "")
              .toLowerCase()
              .trim();
            return normalizedUserTags.includes(tagWisata);
          });

          if (mlSesuaiTag.length > 0) {
            setRekomendasi(mlSesuaiTag);
            setIsLoading(false);
            return;
          }
        } else if (hasilML.length > 0 && normalizedUserTags.length === 0) {
          setRekomendasi(hasilML);
          setIsLoading(false);
          return;
        }
      }

      if (normalizedUserTags.length > 0) {
        const hasilSesuaiPreferensi = dataWisata.filter((tempat) => {
          const tagWisata = String(tempat.tag || tempat.kategori || "")
            .toLowerCase()
            .trim();
          return normalizedUserTags.includes(tagWisata);
        });

        if (hasilSesuaiPreferensi.length > 0) {
          setRekomendasi(hasilSesuaiPreferensi);
          setIsLoading(false);
          return;
        }
      }

      console.log("🚀 Memicu Popup karena data preferensi & ML kosong!");
      setShowPopup(true);
      setRekomendasi(dataWisata.slice(0, 10));
    } catch (error) {
      console.error("Gagal mengambil data rekomendasi:", error);
      setRekomendasi(dataWisata.slice(0, 10));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWisataPopuler = async () => {
    try {
      setIsLoadingPopuler(true);
      const response = await axios.get("http://localhost:5001/places/popular");
      const dataPopuler = response.data?.data || [];

      const hasilLengkapPopuler = dataPopuler
        .map((item) => {
          const idPopuler = item.placeId || item.id || item.Place_Id;
          return dataWisata.find(
            (tempat) =>
              String(tempat.placeId) === String(idPopuler) ||
              String(tempat.Place_Id) === String(idPopuler) ||
              String(tempat.id) === String(idPopuler),
          );
        })
        .filter(Boolean);

      setPopuler(hasilLengkapPopuler);
    } catch (error) {
      console.error("Gagal mengambil data wisata populer:", error);
    } finally {
      setIsLoadingPopuler(false);
    }
  };

  const fetchUserLikes = async () => {
    if (!isLoggedIn || !token) {
      setLikedPlaces([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5001/users/likes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const likesData = response.data?.data || [];
      const likesIds = likesData.map((item) => item.placeId || item.id || item);
      setLikedPlaces(likesIds);
    } catch (error) {
      if (error.response?.status === 401) {
        if (logout) logout();
        setLikedPlaces([]);
        return;
      }
      console.error("Gagal mengambil riwayat Like di Homepage:", error);
    }
  };

  useEffect(() => {
    fetchWisataPopuler();
    fetchUserLikes();
    fetchRekomendasi();
  }, [isLoggedIn, token, location.pathname]);

  const handleLikeClick = async (placeId) => {
    if (!isLoggedIn || !token) {
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Silakan masuk (login) terlebih dahulu untuk menyukai tempat ini.",
        confirmButtonColor: "#0038FF",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const isCurrentlyLiked = likedPlaces.includes(placeId);
    if (isCurrentlyLiked) {
      setLikedPlaces((prev) => prev.filter((id) => id !== placeId));
    } else {
      setLikedPlaces((prev) => [...prev, placeId]);
    }

    try {
      await axios.post(
        "http://localhost:5001/users/likes",
        { placeId: placeId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (error) {
      console.error("Gagal mengirim interaksi Like:", error);
      if (isCurrentlyLiked) {
        setLikedPlaces((prev) => [...prev, placeId]);
      } else {
        setLikedPlaces((prev) => prev.filter((id) => id !== placeId));
      }
    }
  };

  const handleSavePreferences = async (selectedTags) => {
    if (selectedTags.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Preferensi",
        text: "Pilih minimal satu preferensi wisata ya!",
        confirmButtonColor: "#0038FF",
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5001/users/preferences",
        { tags: selectedTags },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShowPopup(false);
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Preferensi wisata kamu berhasil disimpan.",
        showConfirmButton: false,
        timer: 1500,
      });

      fetchRekomendasi();
    } catch (error) {
      console.error("Gagal menyimpan preferensi:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan",
        text: "Terjadi kesalahan saat menyimpan preferensi.",
        confirmButtonColor: "#0038FF",
      });
    }
  };

  const handleSkipPreferences = async () => {
    setShowPopup(false);
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5001/places/random-places",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const dataRandom = response.data?.data || [];
      const hasilRandomLengkap = dataRandom
        .map((item) => {
          const idRandom = item.placeId || item.id || item.Place_Id;
          return dataWisata.find(
            (tempat) =>
              String(tempat.placeId) === String(idRandom) ||
              String(tempat.Place_Id) === String(idRandom) ||
              String(tempat.id) === String(idRandom),
          );
        })
        .filter(Boolean);

      setRekomendasi(hasilRandomLengkap);
    } catch (error) {
      console.error("Gagal mengambil wisata acak:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDetailOnClick = (placeId) => {
    navigate(`/detail/${placeId}`);
  };

  return (
    <HomeTemplate
      rekomendasi={rekomendasi}
      isLoading={isLoading}
      populer={populer}
      isLoadingPopuler={isLoadingPopuler}
      showPopup={showPopup}
      onClosePopup={handleSkipPreferences}
      onSubmitPreferences={handleSavePreferences}
      onCardClick={handleDetailOnClick}
      likedPlaces={likedPlaces}
      onLikeClick={handleLikeClick}
    />
  );
};

export default Homepage;