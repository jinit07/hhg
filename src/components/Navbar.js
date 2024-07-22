import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/lend">Lend Money</Link>
        </li>
        <li>
          <Link to="/borrow">Borrow Money</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
