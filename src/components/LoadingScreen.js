import React from 'react'
import '../styles/LoadingScreen.css'

function LoadingScreen () {
  return (
    <div className="loading-screen">
      <div className="loading-cover"></div>
      <div className="loading-spinner"></div>
      <p>Loading Selection...</p>
    </div>
  )
}

export default LoadingScreen
