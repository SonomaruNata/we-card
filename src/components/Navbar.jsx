import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaAddressCard, FaSignInAlt, FaHeart, FaUserPlus, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode, isAuthenticated, login, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        <img src="/logo.png" alt="weCard Logo" width="30" height="30" className="d-inline-block align-top" /> weCard
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/"><FaHome /> Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about"><FaInfoCircle /> About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/my-cards"><FaAddressCard /> My Cards</Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login"><FaSignInAlt /> Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register"><FaUserPlus /> Register</Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={logout}>Logout</button>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/favorites"><FaHeart /> Favorites</Link>
          </li>
        </ul>
        <form className="form-inline ml-auto" action="https://www.google.com/search" method="get" target="_blank">
          <input className="form-control mr-sm-2" type="search" placeholder="Search Google" aria-label="Search" name="q" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <button className="btn btn-dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


