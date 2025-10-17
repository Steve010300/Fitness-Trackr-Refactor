import { NavLink } from "react-router-dom"
import { useAuth } from "../auth/AuthContext";

/** Navbar with site navigation links */
export default function Navbar() {
  const { token, logout } = useAuth();
  
  return (
    <header>
      <p>Fitness Trackr</p>
      <nav>
        <NavLink to="/">Activities</NavLink>
        {token ? (
          <a
            href="#logout"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}
          >
            Log out
          </a>
        ) : (
          <>
            <NavLink to="/auth/register">Register</NavLink>
            <NavLink to="/auth/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
