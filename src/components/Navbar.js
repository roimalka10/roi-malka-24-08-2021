import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <div className="navbar">
        <a href="/">Herolo Weather App</a>
        <div className={showMenu ? "navbar-items active" : "navbar-items"}>
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
          <NavLink activeClassName="activated" to="/favourites">
            <span>Favourites</span>
          </NavLink>
        </div>
        <div className="burger-icon" onClick={handleClick}>
          {showMenu ? <FaTimes size={32} /> : <FaBars size={28} />}
        </div>
      </div>
    </>
  );
};

export default Navbar;
