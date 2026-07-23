import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/Authcontext";
import Swal from "sweetalert2";

import ProfileTemplate from "../components/templates/Profiletemplate";

const Profilepage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, token } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [originalUserData, setOriginalUserData] = useState(null);

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    kategoriPilihan: [],
  });

  const [wisataDisukai, setWisataDisukai] = useState([]);

  const fetchProfileData = async () => {
    if (!isLoggedIn || !token) {
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Silakan masuk (login) terlebih dahulu.",
        confirmButtonColor: "#0038FF",
      }).then(() => {
        navigate("/login");
      });
      return;
    }
    setIsLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const responseUser = await axios.get(
        "https://backend-express-tourist-recommendation-production.up.railway.app/users/profile",
        config,
      );
      const profileData = responseUser.data.data || responseUser.data;
      const rawCategories = profileData.preferredTags || [];
      const formattedCategories = Array.isArray(rawCategories)
        ? rawCategories.map((item) => {
            if (typeof item === "object" && item !== null) {
              return (
                item.tag ||
                item.name ||
                item.preference ||
                item.kategori ||
                JSON.stringify(item)
              );
            }
            return item;
          })
        : [];
      const fetchedUser = {
        email: profileData.email || "",
        name: profileData.name || "",
        password: "",
        kategoriPilihan: formattedCategories,
      };
      setUserData(fetchedUser);
      setOriginalUserData(fetchedUser);
      const responseLikes = await axios.get(
        "https://backend-express-tourist-recommendation-production.up.railway.app/users/likes",
        config,
      );

      setWisataDisukai(responseLikes.data.data || []);
    } catch (error) {
      console.error("Gagal memuat data profil:", error);
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "info",
          title: "Sesi Berakhir",
          text: "Sesi Anda telah habis, silakan login kembali.",
          confirmButtonColor: "#0038FF",
        }).then(() => {
          navigate("/login");
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [isLoggedIn, token]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setUserData({ ...originalUserData, password: "" });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTagToggle = (tagYangDiklik) => {
    setUserData((prev) => {
      const sudahAda = prev.kategoriPilihan.includes(tagYangDiklik);
      let tagBaru;
      if (sudahAda) {
        tagBaru = prev.kategoriPilihan.filter((item) => item !== tagYangDiklik);
      } else {
        tagBaru = [...prev.kategoriPilihan, tagYangDiklik];
      }
      return { ...prev, kategoriPilihan: tagBaru };
    });
  };
  const handleSaveProfile = async () => {
    if (!userData.name.trim() || !userData.email.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Data Tidak Lengkap",
        text: "Nama Pengguna dan Alamat Email tidak boleh kosong!",
        confirmButtonColor: "#0038FF",
      });
      return;
    }
    if (!userData.kategoriPilihan || userData.kategoriPilihan.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Kategori",
        text: "Pilih minimal 1 kategori wisata favoritmu!",
        confirmButtonColor: "#0038FF",
      });
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const updatePayload = {
        name: userData.name,
        email: userData.email,
      };

      if (userData.password && userData.password.trim() !== "") {
        updatePayload.password = userData.password;
      }

      await axios.patch(
        "https://backend-express-tourist-recommendation-production.up.railway.app/users/profile",
        updatePayload,
        config,
      );

      await axios.post(
        "https://backend-express-tourist-recommendation-production.up.railway.app/users/preferences",
        { tags: userData.kategoriPilihan },
        config,
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data profil dan preferensi wisata berhasil diperbarui!",
        showConfirmButton: false,
        timer: 2000,
      });

      setIsEditing(false);
      await fetchProfileData();
    } catch (error) {
      console.error("Gagal memperbarui profil:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan data.";
      Swal.fire({
        icon: "error",
        title: "Gagal Memperbarui",
        text: errorMessage,
        confirmButtonColor: "#0038FF",
      });
    }
  };

  const handleCardClick = (placeId) => {
    navigate(`/detail/${placeId}`);
  };

  const handleLikeClick = async (placeId) => {
    setWisataDisukai((prev) =>
      prev.filter((item) => (item.placeId || item.id) !== placeId),
    );

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(
        "https://backend-express-tourist-recommendation-production.up.railway.app/users/likes",
        { placeId },
        config,
      );
    } catch (error) {
      console.error("Gagal mengubah status like:", error);
      fetchProfileData();
    }
  };

  return (
    <ProfileTemplate
      userData={userData}
      likePlaces={wisataDisukai}
      isLoading={isLoading}
      isEditing={isEditing}
      onEditClick={handleEditClick}
      onCancelEdit={handleCancelEdit}
      onSaveProfile={handleSaveProfile}
      onInputChange={handleInputChange}
      onTagToggle={handleTagToggle}
      onCardClick={handleCardClick}
      onLikeClick={handleLikeClick}
    />
  );
};

export default Profilepage;
