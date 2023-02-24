import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [newButton, setnewButton] = useState(true);
  const url = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const endPoint = url.pathname;

    if (endPoint !== "/") {
      setnewButton(false);
    } else {
      setnewButton(true);
    }
  }, [url]);

  return (
    <nav>
      <Link className="navbtn" to="/">
        Home
      </Link>
      {newButton && (
        <button className="navbtn" onClick={() => navigate("/new")}>
          Add New
        </button>
      )}
    </nav>
  );
}

export default Navbar;
