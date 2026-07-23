import React from "react";
import { Link } from "react-router-dom";
import heroRegis from "../../assets/images/heroRegister.png";
import RegisForm from "../../components/organisms/Regisform.jsx"; 
const RegisterPage = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen w-full bg-white overflow-hidden">
      <div
        className="
          w-full             
          md:w-1/2           
          h-48               
          md:h-full          
          bg-cover 
          bg-center
        "
        style={{
          backgroundImage: `url(${heroRegis})`,
        }}
      >
        <div className="w-full h-full bg-black/5"></div>
      </div>
      <div
        className="
        w-full 
        md:w-1/2 
        flex 
        flex-col 
        p-8 
        md:p-16 
        lg:p-24 
        justify-center 
        relative 
        overflow-y-hidden  
      "
      >
        <div className="w-full max-w-md mx-auto md:mx-0">
          <RegisForm />
          <div className="mt-2 text-center md:text-left">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-bold text-black hover:underline underline-offset-4"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
