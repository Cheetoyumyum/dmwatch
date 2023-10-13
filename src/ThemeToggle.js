/* eslint-disable react/prop-types */
import React from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'

function ThemeToggle ({ onThemeChange, currentTheme, isDisabled }) {
  const handleThemeChange = (theme) => {
    if (!isDisabled) {
      onThemeChange(theme)
    }
  }

  return (
    <div className="theme-dropdown">
      <button
        className="theme-toggle-button"
        onClick={() => handleThemeChange('light')}
        disabled={isDisabled || currentTheme === 'light'}
      >
        <FaSun />
      </button>
      <button
        className="theme-toggle-button"
        onClick={() => handleThemeChange('dark')}
        disabled={isDisabled || currentTheme === 'dark'}
      >
        <FaMoon />
      </button>
    </div>
  )
}

export default ThemeToggle
