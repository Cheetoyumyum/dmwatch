import React, { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

function ThemeToggler () {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <label className="theme-toggler">
      <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
      <span className="slider round"></span>
    </label>
  )
}

export default ThemeToggler
