import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Header.css'
import PropTypes from 'prop-types'
import { ReactComponent as DMWatchSVG } from '../assets/DMWatch.svg'

function Header ({ onOpenReportModal }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAuthAndAdminStatus = () => {
      const userIsAuthenticated = /* Your authentication logic */ false
      const userIsAdmin = /* Your staff check logic */ false

      setIsAuthenticated(userIsAuthenticated)
      setIsAdmin(userIsAdmin)
    }

    checkAuthAndAdminStatus()
  }, [])

  const handleLogOut = () => {
    setIsAuthenticated(false)
    console.log('User logged out. isAuthenticated:', isAuthenticated)
  }

  function handleResolveReport () {
    window.location.href = 'https://discord.gg/dmwatch'
  }

  return (
    <header className="App__header">
      <nav className="navbar">
        <div className='left-content'>
        <div className="brand">
          <Link to="/">
            <DMWatchSVG />
          </Link>
        </div>
        </div>
        <div className="center-content">
        </div>
        <div className="right-content">
            <button className="nav-button" onClick={handleResolveReport}>Join our Discord</button>
            <button className="nav-button" onClick={() => onOpenReportModal('Submit')}>
              Submit a report
            </button>
            <button className="nav-button" onClick={handleResolveReport}>
              Resolve a report
            </button>
          {/* PLEASE DELETE THIS EXTRA ADMIN LINK ONCE LOGIC IS INPLACE. */}
          <Link to='/admin'>
            <button className='nav-button'>Admin</button>
          </Link>
          {isAuthenticated
            ? (
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
              )
            : (
            <button className="nav-button" >
              Sign In
            </button>
              )}
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  onOpenReportModal: PropTypes.func.isRequired
}

export default Header
