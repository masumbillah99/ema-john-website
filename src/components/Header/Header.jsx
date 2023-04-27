import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Logo.svg";
import { AuthContext } from "../providers/AuthProvider";
import "./Header.css";

const Header = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then()
      .catch((error) => console.log(error));
  };

  return (
    <nav className="header">
      <img src={logo} alt="" />
      <div>
        <Link to="/">Shop</Link>
        <Link to="/orders">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <Link to="/login">Login</Link>
        <Link to="/sign-up">Sign up</Link>
        {user && (
          <span className="text-white">
            {user.email}
            <button onClick={handleSignOut}>Sign Out</button>
          </span>
        )}
      </div>
    </nav>
  );
};

export default Header;
