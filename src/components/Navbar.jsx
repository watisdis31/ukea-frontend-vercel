import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { showSuccess } from "../utils/swal";

export default function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const location = useLocation();
  const navigate = useNavigate();

  function navClass(path) {
    const isActive = location.pathname === path;

    return `
      relative
      ${isActive ? "text-white after:w-full" : "text-zinc-300"}
      hover:text-white
      after:absolute after:left-0 after:-bottom-1
      after:h-0.5 after:bg-amber-500
      after:transition-all after:duration-300
      ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}
    `;
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");

    setToken("");
    setRole("");

    showSuccess("Successfully logged out");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/80 backdrop-blur-md text-white px-8 py-4 flex justify-between items-center">
      <h1 className="px-3 py-1 border-2 border-amber-500 rounded-full text-xl font-extrabold tracking-tight">
        <span className="text-amber-500">U</span>
        <span className="text-blue-500">KEA</span>
      </h1>

      <div className="flex gap-7 text-zinc-300">
        <Link to="/" className={navClass("/")}>
          Home
        </Link>
        <Link to="/pub/products" className={navClass("/pub/products")}>
          Products
        </Link>
        {token && role === "Admin" && (
          <Link
            to="/cms"
            className="relative hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-amber-500 after:transition-all after:duration-300 hover:after:w-full"
          >
            Admin Dashboard
          </Link>
        )}
      </div>

      <div className="flex gap-4">
        {!token ? (
          <>
            <Link
              to="/login"
              className="bg-amber-500 text-black px-4 py-1 rounded hover:bg-amber-400"
            >
              Login
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-amber-500 text-black px-4 py-1 rounded hover:bg-amber-400 cursor-pointer"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
