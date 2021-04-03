import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import newLocalStorage from "../../scripts/localStorage";
import { AuthContext } from "../../context/AuthContext";
import "./index.css";

function Header() {
  const user = newLocalStorage.getUser();

  const auth = useContext(AuthContext);
  return (
    <div className="header">
      <div className="inner">
        <div className="nav">
          <NavLink to="/main" className="item">
            Main
          </NavLink>
          <NavLink to="/memories" className="item">
            Memories
          </NavLink>
          <NavLink to="/about" className="item">
            About
          </NavLink>
          <NavLink to="/contacts" className="item">
            Contacts
          </NavLink>
        </div>
        <div
          className="logout"
          onClick={(e) => {
            auth.logout(user.userId);
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
export default Header;
