import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../context/Authcontext.jsx";

import InputField from "../molecules/Inputfield.jsx";
import Button from "../atoms/Buttons.jsx";
import Logo from "../../assets/images/logo.svg";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email dan kata sandi diperlukan");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/users/login", {
        email: email.toLocaleLowerCase(),
        password,
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const token = response.data.data.token;
      login(token);
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message || "Gagal login, password atau alamat email salah"; 
      setError(errorMessage);
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="w-full">
      <Link to="/" className="flex items-center mb-6 mt-4 md:mt-0">
        <img src={Logo} alt="Logo kujangTrip" className="h-10 w-auto" />
        <span className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">
          kujang<span className="text-[#0061FF] italic">Trip</span>
        </span>
      </Link>

      <div className="mb-2">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-2">
          Temukan <br /> Destinasi wisata <br /> Terbaikmu!
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-sm">
          Masuk sekarang dan biarkan kujangTrip merekomendasikan tempat liburan
          di Kota Bogor yang paling sesuai dengan preferensi unikmu
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
          placeholder="Alamat Email"
          className="mb-2"
          inputClassName="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
        />

        <div className="relative">
          <InputField
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kata Sandi"
            inputClassName="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
          />
        </div>

        <Button
          type="submit"
          styles="w-full py-3 bg-[#0061FF] hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-md mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Memuat..." : "Masuk"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
