import { Link } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTrophy,
  faStore,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="header">
      <div className="nav-container">
        <div className="nav-section">
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} width={"100px"}></img>
            <h2 className="logo-text">shibatype</h2>
          </Link>
          <Link className="nav-icon" to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link className="nav-icon" to="/leaderboard">
            <FontAwesomeIcon icon={faTrophy} />
          </Link>
          <Link className="nav-icon" to="/store">
            <FontAwesomeIcon icon={faStore} />
          </Link>
        </div>
        <div className="nav-section">
          <Link className="nav-icon" to="/account">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    </header>
  );
}
