import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.scss";

const NavBar = (props) => {
  let loginStatus=props.login

  let currentRoute = useLocation().pathname;

  return (
    <div className="NavBar">
      <div className="logo">
        <Link to="/">BookR</Link>
      </div>
      <div className="register">
        {loginStatus.loggedIn ? (
          <div className="greet">Hello, {loginStatus.name}</div>
        ) : (
          <div className="btn">
            <Link to={{pathname:"/signup", search:`?origin=${currentRoute}`}}>Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
