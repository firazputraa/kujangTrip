import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import axios from "axios";
import Swal from "sweetalert2"; 

import DetailTemplate from "../components/templates/Detailtemplate";
import dataWisata from "../data/dataset_wisata_gabungan_cleaned_final_1.2.json";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [placeDetail, setPlaceDetail] = useState(null);
  const [similarPlaces, setSimilarPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchPlaceData = async () => {
      setIsLoading(true);
      try {
        const placeFound = dataWisata.find(
          (tempat) =>
            String(tempat.placeId) === String(id) ||
            String(tempat.Place_Id) === String(id),
        );
        setPlaceDetail(placeFound);

        if (placeFound) {
          const similarResponse = await axios.get(
            `http://localhost:5001/places/${id}/similar`,
          );
          const outputSimilar = similarResponse.data.data || [];

          if (outputSimilar.length > 0) {
            setSimilarPlaces(outputSimilar.slice(0, 4));
          } else {
            console.log(
              "Backend mengirimkan array kosong. Flask mungkin tidak menemukan placeId ini.",
            );
          }
        }
      } catch (error) {
        console.error("Gagal mengambil data detail:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaceData();
    window.scrollTo(0, 0);
  }, [id]);

  const handleLikeClick = async () => {
    if (!token) {
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

    const previousLikeState = isLiked;
    setIsLiked(!isLiked); 

    try {
      const response = await axios.post(
        "http://localhost:5001/users/likes",
        {
          placeId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log("✅ Berhasil:", response.data.message);
    } catch (error) {
      setIsLiked(previousLikeState); 
      console.error("❌ Gagal mengirim interaksi Like:", error);
      Swal.fire({
        icon: "error",
        title: "Koneksi Gagal",
        text: "Terjadi kesalahan saat terhubung ke server. Silakan coba lagi.",
        confirmButtonColor: "#0038FF",
      });
    }
  };

  const handleCardClick = (placeId) => {
    navigate(`/detail/${placeId}`);
  };

  return (
    <DetailTemplate
      place={placeDetail}
      similarPlaces={similarPlaces}
      isLoading={isLoading}
      isLiked={isLiked}
      onLikeClick={handleLikeClick}
      onCardClick={handleCardClick}
    />
  );
};

export default DetailPage;
