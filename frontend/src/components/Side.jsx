import React from "react";
import { NavLink } from "react-router-dom";

const Side = () => {
  return (
    <div className="min-h-screen pl-[4rem] pr-[7rem] py-4 border-r border-[#3d3d3d] text-lg leading-7">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to={"/about"}>About</NavLink>
        </li>
        <li>
          <NavLink to={"/service"}>Services</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Side;
