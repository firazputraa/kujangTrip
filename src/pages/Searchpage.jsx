import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import Swal from "sweetalert2";

import SearchTemplate from "../components/templates/Searchtemplate";
import dataWisata from "../data/dataset_wisata_gabungan_cleaned_final_1.2.json";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoggedIn, token } = useAuth();

  const initialQuery = searchParams.get("keyword") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [likedPlaces, setLikedPlaces] = useState([]);

  const fetchSearchResults = async (keyword) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      if (!keyword || !keyword.trim()) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        if (isLoggedIn && token) {
          try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const responseUser = await axios.get(
              "https://backend-express-tourist-recommendation-production.up.railway.app/users/profile",
              config,
            );
            const profileData =
              responseUser.data?.data || responseUser.data || {};
            const userTags =
              profileData.preferredTags || profileData.preferences || [];
            const normalizedUserTags = Array.isArray(userTags)
              ? userTags
                  .map((t) => String(t).toLowerCase().trim())
                  .filter(Boolean)
              : [];

            if (normalizedUserTags.length > 0) {
              const hasilSesuaiPreferensi = dataWisata.filter((tempat) => {
                const tagWisata = String(tempat.tag || tempat.kategori || "")
                  .toLowerCase()
                  .trim();
                return normalizedUserTags.includes(tagWisata);
              });

              setSearchResults(
                hasilSesuaiPreferensi.length > 0
                  ? hasilSesuaiPreferensi
                  : dataWisata,
              );
              setIsLoading(false);
              return;
            }
          } catch (profileError) {
            console.warn(
              "Gagal membaca tag profil untuk filter otomatis:",
              profileError,
            );
          }
        }
        setSearchResults(dataWisata || []);
        setIsLoading(false);
        return;
      }

      const response = await axios.get("https://backend-express-tourist-recommendation-production.up.railway.app/places/search", {
        params: { query: keyword },
      });
      await new Promise((resolve) => setTimeout(resolve, 600));
      const outputData = response.data.data || [];
      const hasilLengkap = outputData
        .map((item) => {
          const idDariDB = item.placeId || item.id || item.Place_Id;
          return dataWisata.find(
            (tempat) =>
              String(tempat.placeId) === String(idDariDB) ||
              String(tempat.Place_Id) === String(idDariDB) ||
              String(tempat.id) === String(idDariDB),
          );
        })
        .filter(Boolean);

      setSearchResults(hasilLengkap);
    } catch (error) {
      console.error("Gagal melakukan pencarian:", error);
      if (keyword.trim()) {
        const fallbackSearch = dataWisata.filter((item) =>
          (item.place_name || item.name || "")
            .toLowerCase()
            .includes(keyword.toLowerCase()),
        );
        setSearchResults(fallbackSearch);
      } else {
        setSearchResults(dataWisata || []);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserLikes = async () => {
    if (!isLoggedIn || !token) return;
    try {
      const response = await axios.get("https://backend-express-tourist-recommendation-production.up.railway.app/users/likes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const likesData = response.data?.data || [];
      const likesIds = likesData.map((item) => item.placeId || item.id || item);
      setLikedPlaces(likesIds);
    } catch (error) {
      console.error("Gagal mengambil riwayat Like:", error);
    }
  };

  useEffect(() => {
    fetchUserLikes();
    fetchSearchResults(initialQuery);
  }, [initialQuery, isLoggedIn]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ keyword: searchQuery });
  };

  const handleLikeClick = async (placeId) => {
    if (!isLoggedIn || !token) {
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Silakan masuk (login) terlebih dahulu untuk menyimpan preferensi Anda.",
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
        "https://backend-express-tourist-recommendation-production.up.railway.app/users/likes",
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
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan",
        text: "Terjadi kesalahan saat terhubung ke server. Silakan coba lagi.",
        confirmButtonColor: "#0038FF",
      });
    }
  };

  const handleCardClick = (placeId) => {
    navigate(`/detail/${placeId}`);
  };

  return (
    <SearchTemplate
      searchQuery={searchQuery}
      onSearchChange={(e) => setSearchQuery(e.target.value)}
      onSubmitSearch={handleSearchSubmit}
      searchResults={searchResults}
      isLoading={isLoading}
      hasSearched={hasSearched}
      likedPlaces={likedPlaces}
      onLikeClick={handleLikeClick}
      onCardClick={handleCardClick}
    />
  );
};

export default SearchPage;
