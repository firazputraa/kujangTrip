import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import profile1 from "../assets/images/profile1.jpg";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decodedToken = jwtDecode(savedToken);
        console.log(
          "AuthContext: Token yang sudah didekode dari localStorage:",
          decodedToken,
        );
        if (decodedToken.exp * 1000 > Date.now()) {
          setLoggedIn(true);
          setToken(savedToken);
          setUser({
            id: decodedToken.id,
            email: decodedToken.email,
            name: decodedToken.name,
            profilePic: decodedToken.profilePic || profile1,
          });
        } else {
          localStorage.removeItem("token");
          console.log("Authcontext: Token Kedaluwarsa");
        }
      } catch (error) {
        console.error(
          "AuthContext: Kesalahan saat mendekode token saat dipasang:",
          error,
        );
        localStorage.removeItem("token");
      }
    } else {
      console.log("AuthContext: Tidak ada token yang ditemukan saat dimuat.");
    }
    setLoading(false);
  }, []);
  const login = (receivedToken) => {
    localStorage.setItem("token", receivedToken);
    console.log("AuthContext: User login.");
    try {
      const decodedToken = jwtDecode(receivedToken);
      setLoggedIn(true);
      setToken(receivedToken);
      setUser({
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
        profilePic: decodedToken.profilePic || profile1,
      });
    } catch (error) {
      console.error("AuthContext: Error decoding token on login:", error);
      setLoggedIn(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };
  const logout = () => {
    setLoggedIn(false); 
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    console.log("AuthContext: User logged out.");
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 font-medium">Memuat data Kujang Trip...</p>
      </div>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, token, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }
  return context;
};
