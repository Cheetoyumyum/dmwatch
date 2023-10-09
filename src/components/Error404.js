import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error404 () {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/')
  }

  return (
    <div className="error-message">
      <div className="error-title">Not Found</div>
      <div className="error-code">404</div>
      <p>If what you are looking for should exist, please contact our admins.</p>
      <br />
      <button className="back-link" onClick={handleHomeClick}>
        Home
      </button>
    </div>
  )
}

export default Error404
