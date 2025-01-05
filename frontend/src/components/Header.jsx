import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Header = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className=" text-[#E9E9E9] flex justify-between items-center px-12 h-14 bg-[#151A21]">
      <Link
        className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text "
        to="/"
      >
        Vulnerabilities
      </Link>
      <div className="flex justify-center items-center gap-8 text-[1.1rem]">
        {isAuthenticated ? (
          <NavLink to={"/dashboard"}>Profile</NavLink>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
