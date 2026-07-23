import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Authcontext";
import Swal from "sweetalert2"; 

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Akses Ditolak",
        text: "Silakan masuk (login) terlebih dahulu untuk melihat halaman ini.",
        showCancelButton: true,
        confirmButtonColor: "#0038FF",
        cancelButtonColor: "#6B7280", 
        confirmButtonText: "Login Sekarang",
        cancelButtonText: "Batal",
        allowOutsideClick: false, 
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location }, replace: true });
        } else {
          navigate("/", { replace: true });
        }
      });
    }
  }, [isLoggedIn, navigate, location]);
  if (!isLoggedIn) {
    return null;
  }
  return children;
};

export default ProtectedRoute;
