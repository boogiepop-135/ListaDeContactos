import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa"; 
import "../Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light py-1 custom-navbar">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 py-0 fs-5">Home</span>
        </Link>
        <div className="ml-auto">
          <Link to="/add">
            <button className="btn btn-primary">
              <FaPlus style={{ marginRight: "5px" }} /> Add Contact
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};