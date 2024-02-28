import "./navigation.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./user-context";

export default function Navigation() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('access_token');
    navigate('/login');
  }

    return (
        <nav className="nav-main">
        <ul className="nav-ul">
          <li className="nav-li1">
            <Link to="/">Cards</Link>
          </li>
          <li className="nav-li2">
            <Link to="/about">Profile Page</Link>
          </li>
          <li className="nav-li3">
            <Link to="/create-movie">Create Card</Link>
          </li>
          {
            !user?.user
            ? (
              <>
              <li className="nav-li4">
              <Link to="/register">Register</Link>
            </li>
            <li className="nav-li5">
              <Link to="/login">Login</Link>
            </li>
            </>
            )
            : (
              <li className="nav-li6" onClick={() => logout()}>
              <spam>Logout</spam>
            </li>
            )}
        </ul>
      </nav>
    );
}