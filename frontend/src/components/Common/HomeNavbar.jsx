import { Link } from "react-router-dom";

import "../Style/HomeNavbar.scss";
import { ReactComponent as Logo } from "../../images/logo.svg";

export default function HomeNavbar() {
  return (
    <div className="home-navbar">
      <div id="logo">
        <Link
          to={"/"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div>
            <Logo style={{ width: "32px" }} />
          </div>
          <div> BookMyDoctor</div>
        </Link>
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
