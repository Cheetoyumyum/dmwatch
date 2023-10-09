import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logoImage from '../assets/logo.png';

function Header({ onOpenReportModal }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  useEffect(() => {
    const checkAuthAndAdminStatus = () => {
      const userIsAuthenticated = /* Your authentication logic */ false;
      const userIsAdmin = /* Your staff check logic */ false;

      setIsAuthenticated(userIsAuthenticated);
      setIsAdmin(userIsAdmin);
    };

    checkAuthAndAdminStatus();
  }, []);

  const handleLogOut = () => {
    setIsAuthenticated(false);
    console.log('User logged out. isAuthenticated:', isAuthenticated);
  };

  return (
    <header className="App__header">
      <nav className="navbar">
        <div className='left-content'>
          <button className="discord-button" href='https://discord.gg/dmwatch'>Join our Discord</button>
          <button className="nav-button" onClick={() => onOpenReportModal('Submit')}>
            Submit a report
          </button>
        </div>
        <div className="center-content">
          <div className="brand">
            <Link to='/'>
              <img src={logoImage} alt="DMWatch Logo" className="logo-image" />
              <h1 className='logo-text'>DMWatch</h1>
            </Link>
          </div>
        </div>
        <div className="right-content">
          <Link to='/resolve'>
            <button className="nav-button">
              Resolve a report
            </button>
          </Link>
          {/* PLEASE DELETE THIS EXTRA ADMIN LINK ONCE LOGIC IS INPLACE. */}
          <Link to='/admin'>
            <button className='nav-button'>Admin</button>
          </Link>
          {isAuthenticated ? (
            <div className="user-dropdown">
              <button className="username">Username</button>
              <div className="dropdown-content">
                <button className='nav-button' onClick={handleLogOut}>Log Out</button>
                {isAdmin && (
                  // Display the 'Admin panel' link/button if the user is the appropriate staff member
                  <Link to='/admin'>
                    <button className='nav-button'>Admin</button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <button className="sign-in" >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
