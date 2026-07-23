import React from "react";
import heroLogin from "../../assets/images/heroLogin.png";
import LoginForm from "../../components/organisms/Loginform";
import { Link, useNavigate } from "react-router-dom";


const LoginPage = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
      <div
        className="w-full md:h-screen h-64 md:w-1/2  bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroLogin})`,
        }}
      >
        <div className="w-full h-full bg-black/5"></div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 justify-center relative">
        <div className="w-full">
          <LoginForm />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="font-bold text-black hover:underline underline-offset-4"
              >Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
