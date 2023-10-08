import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logoImage from '../assets/logo.png';

function Header({ onOpenReportModal, onOpenSignInModal, modalType, setModalType }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
  }, [isAuthenticated]);

  const handleLogOut = () => {
    setIsAuthenticated(false);
    console.log('User logged out. isAuthenticated:', isAuthenticated);
  };

  const openSignInModal = () => {
    onOpenSignInModal('SignIn');
    setIsSignInModalOpen(true);
    console.log('Opening sign-in modal. isAuthenticated:', isAuthenticated);
  };

  return (
    <header className="App__header">
      <nav className="navbar">
        <div className="center-content">
          <ul>
            <li>
              <a id="submit" href="#" onClick={() => onOpenReportModal('Submit')}>
                Submit a report
              </a>
            </li>
              <div className="brand">
              <Link to='/'>
                <img src={logoImage} alt="DMWatch Logo" className="logo-image" />
                <h1 className='logo-text'>DMWatch</h1>
              </Link>
              </div>
            <li>
              <Link to='/resolve'>
              <a id="resolve">
                Resolve a report
              </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="right-content">
          {isAuthenticated ? (
            <div className="user-dropdown">
              <button className="username">Username</button>
              <div className="dropdown-content">
                <button onClick={handleLogOut}>Log Out</button>
              </div>
            </div>
          ) : (
            <button className="sign-in" onClick={openSignInModal}>
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
