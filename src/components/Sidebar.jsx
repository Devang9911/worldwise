import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  `relative text-xl uppercase tracking-widest transition-colors
     ${
       isActive
         ? "text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cyan-400"
         : "text-gray-200 hover:text-cyan-300"
     }`;

function Sidebar() {
  return (
    <div className="w-[50%] h-screen p-2">
      <div className="mt-30 flex flex-col gap-5">
        <ul className=" flex gap-5 items-center justify-center">
          <li>
            <NavLink to="city" end className={linkClasses}>
              City
            </NavLink>
          </li>
          <li>
            <NavLink to={"countries"} className={linkClasses}>
              Countries
            </NavLink>
          </li>
        </ul>
        <div className="min-h-100 overflow-y-auto">
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
