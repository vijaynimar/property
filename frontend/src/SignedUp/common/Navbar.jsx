import React, { useState, useEffect } from "react";
import logo from "../../../public/logo.png";
import "../../App.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-content">
        <a href="/dashboard" className="logo">
          <img src={logo} alt="Logo" />
          HomeHarbor
        </a>
        <button className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <div className={isMobile && isMenuOpen ? "nav-links-mobile" : "nav-links"}>
          <Link to="/dashboard" className="nav-link">Home</Link>
          <Link to="/dashboard/properties" className="nav-link">Properties</Link>
          <Link to="/dashboard/agents" className="nav-link">Agents</Link>
          <Link to="/dashboard/about" className="nav-link">About</Link>
          <Link to="/dashboard/contact" className="nav-link">Contact</Link>
          <button className="button">Get Started</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
