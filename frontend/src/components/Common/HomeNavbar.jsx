import { Link } from "react-router-dom";

import "../Style/HomeNavbar.scss";

export default function HomeNavbar() {
  return (
    <div className="home-navbar">
      <div id="logo">
        <Link to={"/"}>BookMyDoctor</Link>
      </div>
      <nav id="menu">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to={"/signup"}>Signup</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
