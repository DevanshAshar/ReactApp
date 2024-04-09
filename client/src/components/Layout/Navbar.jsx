import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const hrefmap = {
  "About us": "about",
  "Contact us": "contact",
  "Sign Up": "signup",
  "Sign In": "login",
  "Dashboard":"user/applications"
};

const Nav = ({ children }) => (
  <NavLink
    exact
    to={`/${hrefmap[children]}`}
    activeClassName="active"
    className="nav-link"
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const dealingWithLogout = async () => {
    setAuth(null);
    localStorage.removeItem(auth)
    document.cookie="session=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
    document.cookie="sessionid=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
    document.cookie="user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;"
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <NavLink exact to="/">
            <img src="/logo.png" alt="Logo" height="40" />
          </NavLink>
        </div>

        <div className="nav-links">
          <div
            className={`menu-icon ${isOpen && "open"}`}
            onClick={toggleMenu}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <div className={`menu-items ${isOpen && "open"}`}>
            {!auth?.user ? (
              <>
              <div style={{ flex: "1",marginLeft:'75vw' }}></div>
                <Nav>About us</Nav>
                <Nav>Sign Up</Nav>
                <Nav>Sign In</Nav>
                
              </>
            ) : (
              <>
                <div style={{ flex: "1",marginLeft:'75vw' }}></div>
                <Nav>About us</Nav>
                <Nav>Dashboard</Nav>
                <div
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  onClick={dealingWithLogout}
                >
                  Logout
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
