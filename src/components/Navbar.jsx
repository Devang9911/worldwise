import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const linkClasses = ({ isActive }) =>
    `relative text-xl uppercase tracking-widest transition-colors
     ${
       isActive
         ? "text-cyan-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-cyan-400"
         : "text-gray-200 hover:text-cyan-300"
     }`;

  return (
    <header className="fixed w-screen top-0 z-50">
      <nav className="bg-white/10 shadow">
        <div className="max-w-screen mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 sm:pl-15">
            <img src="/logo.png" alt="logo" className="w-10 md:w-12" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-14">
            {/* <li>
              <NavLink to="/" className={linkClasses}>
                Home
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/product" className={linkClasses}>
                Product
              </NavLink>
            </li>
            <li>
              <NavLink to="/pricing" className={linkClasses}>
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            ref={buttonRef}
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden relative w-8 h-8 text-white"
          >
            <span
              className={`absolute h-0.5 w-full bg-white transition-all ${
                open ? "rotate-45 top-4 left-0" : "top-2 left-0"
              }`}
            />
            <span
              className={`absolute h-0.5 w-full bg-white transition-all ${
                open ? "opacity-0 left-0" : "top-4 left-0"
              }`}
            />
            <span
              className={`absolute h-0.5 w-full bg-white transition-all ${
                open ? "-rotate-45 top-4 left-0" : "top-6 left-0"
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden fixed inset-x-4 top-20 rounded-3xl bg-black/80 text-white    backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 ${
            open
              ? "opacity-100 translate-y-0"
              : "opacity-0 pointer-events-none -translate-y-4"
          }`}
        >
          <ul className="flex flex-col items-center gap-8 py-10 text-lg uppercase tracking-wider">
            {/* <li>
              <NavLink onClick={() => setOpen(false)} to="/" className={linkClasses}>
                Home
              </NavLink>
            </li> */}
            <li>
              <NavLink
                onClick={() => setOpen(false)}
                to="/product"
                className={linkClasses}
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setOpen(false)}
                to="/pricing"
                className={linkClasses}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => setOpen(false)}
                to="/login"
                className={linkClasses}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
