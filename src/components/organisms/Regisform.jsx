import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import axios from "axios";

import Logo from "../../assets/images/logo.svg";
import InputField from "../molecules/InputField";
import Button from "../atoms/Buttons";

const RegisForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !name || !password || !confirmPassword) {
      setError("Semua kolom wajib diisi");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Kata sandi tidak cocok");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi minimal harus 6 karakter");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/users/register",
        {
          email,
          name,
          password,
        },
      );
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message || "Pendaftaran gagal, coba lagi ya";
      setError(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto md:mx-0">
      <Link to="/" className="flex items-center mb-6 mt-4 md:mt-0">
        <img src={Logo} alt="Logo kujangTrip" className="h-10 w-auto" />
        <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-800 tracking-tight">
          kujang<span className="text-[#0061FF] italic">Trip</span>
        </span>
      </Link>
      <div className="mb-2">
        <h1 className="text-xl mt-4 md:mt-0 md:text-2xl lg:text-3xl leading-[1.1] mb-2 font-extrabold">
          Dapatkan Rekomendasi Sesuai Seleramu!
        </h1>
        <p className="text-gray-500 text-xs md:text-sm max-w-sm">
          Daftar kujangTrip hari ini, sampaikan preferensimu, dan biarkan sistem
          kami menyusun panduan wisata terbaik di Kota Bogor khusus buat kamu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 text-sm font-semibold bg-red-50 p-2 rounded border-l-4 border-red-500">
            {error}
          </p>
        )}
        <InputField
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukan alamat email"
          className="mb-2"
        />
        <InputField
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukan nama pengguna"
          className="mb-2"
        />
        <InputField
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukan kata sandi"
          className="mb-2"
        />
        <InputField
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Masukan konfirmasi kata sandi"
          className="mb-2"
        />

        <Button
          type="submit"
          styles="w-full py-3 bg-[#0061FF] hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Memuat..." : "Buat akun"}
        </Button>
      </form>
    </div>
  );
};

export default RegisForm;