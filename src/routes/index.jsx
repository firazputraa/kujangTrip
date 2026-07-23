import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation, // 1. Import useLocation di sini
} from "react-router-dom";

import { AuthProvider } from "../context/Authcontext.jsx";
import ProtectedRoute from "../context/Protectedroute.jsx";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import ScrollOnTop from "../components/layouts/Scrollontop.jsx";

import ProfilePage from "../pages/Profilepage.jsx";
import SearchPage from "../pages/Searchpage.jsx";
import DetailPage from "../pages/Detailpage.jsx";
import LoginPage from "../pages/auth/Loginpage";
import RegisterPage from "../pages/auth/Registerpage";
import Homepage from "../pages/Homepage";
import FaqPage from "../pages/Faqpage";
import Aboutpage from "../pages/Aboutpage.jsx";

const Layout = () => {
  // 2. Ambil informasi rute saat ini
  const location = useLocation();

  // 3. Buat kondisi: true jika rute saat ini adalah "/profile"
  const isProfilePage = location.pathname === "/profile";

  return (
    <section className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <ScrollOnTop />
      <main className="grow">
        <Outlet />
      </main>

      {/* 4. Render Footer HANYA JIKA BUKAN di halaman profil (!isProfilePage) */}
      {!isProfilePage && <Footer />}
    </section>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/about",
        element: <Aboutpage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detail/:id",
        element: (
          <ProtectedRoute>
            <DetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: (
      <div className="p-10 text-red-500">404 - Halaman Tidak Ditemukan</div>
    ),
  },
]);

const AppRoutes = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRoutes;
