import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <motion.div
        className="navbar"
        initial={{ y: "-10vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.1, type: "tween" }}
      >
        <a href="/">Herolo Weather App</a>
        <div className={showMenu ? "navbar-items active" : "navbar-items"}>
          <NavLink onClick={handleClick} to="/">
            <span>Home</span>
          </NavLink>
          <NavLink
            onClick={handleClick}
            activeClassName="activated"
            to="/favourites"
          >
            <span>Favourites</span>
          </NavLink>
        </div>
        <div className="burger-icon" onClick={handleClick}>
          {showMenu ? <FaTimes size={32} /> : <FaBars size={28} />}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
