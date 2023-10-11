import React from 'react'
import { FaTicketAlt, FaCheckSquare, FaTimesCircle, FaUsers } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import '../styles/AdminPanel.css'
import SearchBar from './SearchBar'
import Metrics from './Metrics'

function AdminPanel () {
  const navigate = useNavigate()

  const handleTileClick = (tileName) => {
    const tileToRouteMap = {
      'Manage Tickets': 'manage-tickets',
      'Resolved Tickets': 'resolved-tickets',
      'Denied Tickets': 'denied-tickets',
      'Manage Players': 'manage-players'
    }

    navigate(`/admin/${tileToRouteMap[tileName]}`)
  }

  return (
    <div className="admin-panel">
      <Metrics />
      <SearchBar />
      <div className="admin-tiles-container">
        <div className="admin-tile" onClick={() => handleTileClick('Manage Tickets')}>
          <FaTicketAlt className="icon" />
          <h3>Manage Tickets</h3>
          <p>This tile represents the main ticket management section where administrators can view, create, and update tickets.</p>
        </div>
        <div className="admin-tile" onClick={() => handleTileClick('Resolved Tickets')}>
          <FaCheckSquare className="icon" />
          <h3>Resolved Tickets</h3>
          <p>This tile represents tickets that have been successfully resolved or closed. Administrators can review these tickets and their resolutions.</p>
        </div>
        <div className="admin-tile" onClick={() => handleTileClick('Denied Tickets')}>
          <FaTimesCircle className="icon" />
          <h3>Denied Tickets</h3>
          <p>This tile represents tickets that have been denied or rejected. Administrators can review the reasons for denial and any associated information.</p>
        </div>
        <div className="admin-tile" onClick={() => handleTileClick('Manage Players')}>
          <FaUsers className="icon" />
          <h3>Manage Players</h3>
          <p>This tile represents the section for managing player accounts, permissions, and activities.</p>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
