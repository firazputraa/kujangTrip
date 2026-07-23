import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const hamburgerRef = useRef(null);

  const { user, logout, isLoggedIn } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutClick = () => {
    setShowLogoutConfirm(true);
    setIsOpen(false);
  };

  const proceedLogout = () => {
    logout();
    navigate("/");
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => setShowLogoutConfirm(false);
  const profileImage = user?.profilePic;

  const isActiveRoute = (path) => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    if (path !== "/" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  // --- PERUBAHAN DI SINI: Efek Animasi Hover Underline ---
  const getLinkClass = (path) => {
    const baseClass =
      "relative py-1 font-semibold transition-colors duration-300";

    if (isActiveRoute(path)) {
      // Jika aktif: Teks biru, garis bawah biru permanen
      return `${baseClass} text-[#0061FF] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2.5px] after:bg-[#0061FF]`;
    }

    // Jika tidak aktif: Teks abu-abu, efek garis biru memanjang saat dihover (scale-x dari 0 ke 1)
    return `${baseClass} text-gray-700 hover:text-[#0061FF] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2.5px] after:bg-[#0061FF] after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300`;
  };

  const getMobileLinkClass = (path) => {
    if (isActiveRoute(path)) {
      return "w-full text-center font-bold text-white bg-[#0061FF] py-2 rounded-lg shadow-md transition-all duration-300";
    }
    return "w-full text-center text-gray-900 hover:text-[#0061FF] transition-colors duration-500 py-2 rounded-lg font-semibold";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <nav role="navigation" className="px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo Kiri */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight transform transition-transform duration-300 hover:scale-105 active:scale-95"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Kujang<span className="text-[#0061FF] italic">Trip</span>
            </h1>
          </Link>

          {/* Navigasi Tengah */}
          <div className="hidden lg:flex space-x-8 mx-auto">
            <Link to="/about" className={getLinkClass("/about")}>
              About
            </Link>

            <Link to="/search" className={getLinkClass("/search")}>
              Search
            </Link>

            <Link to="/faq" className={getLinkClass("/faq")}>
              FAQ
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={`px-5 py-2 rounded-full transition-all duration-300 font-medium transform hover:-translate-y-0.5 shadow-sm hover:shadow-md active:scale-95 ${
                    isActiveRoute("/profile")
                      ? "bg-[#0061FF] text-white"
                      : "text-[#0061FF] border-2 border-[#0061FF] hover:bg-[#0061FF]/10"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOutClick}
                  className="border border-gray-300 text-gray-700 px-5 py-2 rounded-full hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all duration-300 font-medium transform hover:-translate-y-0.5 active:scale-95"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[#0061FF] border-2 border-[#0061FF] hover:bg-[#0061FF]/10 rounded-full shadow-sm hover:shadow-md px-5 py-2 font-semibold transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-[#0061FF] hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Mobile */}
          <div className="lg:hidden">
            <button
              ref={hamburgerRef}
              onClick={toggleMenu}
              className="focus:outline-none hover:text-[#0061FF] transition-colors duration-300 cursor-pointer"
              aria-label="Toggle Menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <div
          ref={menuRef}
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-center gap-3 shadow-inner">
            <Link to="/about" className={getMobileLinkClass("/about")}>
              About
            </Link>
            <Link to="/search" className={getMobileLinkClass("/search")}>
              Search
            </Link>
            <Link to="/faq" className={getMobileLinkClass("/faq")}>
              FAQ
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={`w-full text-center px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                    isActiveRoute("/profile")
                      ? "bg-[#0061FF] text-white"
                      : "text-[#0061FF] border border-[#0061FF] hover:bg-[#0061FF]/10"
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOutClick}
                  className="w-full text-center border border-gray-300 text-gray-700 px-4 py-2 hover:bg-red-50 hover:border-red-500 hover:text-red-600 rounded-lg transition-colors duration-300 font-medium"
                >
                  Keluar
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="w-full text-center text-[#0061FF] border border-[#0061FF] hover:bg-[#0061FF]/10 px-4 py-2 rounded-lg font-medium transition-colors duration-300"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="w-full text-center bg-[#0061FF] hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal Konfirmasi Logout */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100">
          <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform scale-100 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Konfirmasi Keluar
              </h2>
            </div>
            <p className="text-gray-600 mb-6 text-sm">
              Apakah Anda yakin ingin keluar dari akun KujangTrip?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-5 py-2 font-medium border text-gray-700 rounded-xl hover:bg-gray-100 transition-colors duration-300"
              >
                Batal
              </button>
              <button
                onClick={proceedLogout}
                className="px-5 py-2 font-medium bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-md shadow-red-500/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
