import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/dark-theme.css'
import Home from './components/Home'
import AdminPanel from './components/AdminPanel'
import Header from './components/Header'
import Modal from './components/Modal'
import Cases from './components/Cases'
import Players from './components/Players'
import LoadingScreen from './components/LoadingScreen'
import Error404 from './components/Error404'
import ManageTickets from './components/AdminTickets/ManageTickets'
import ResolvedTickets from './components/AdminTickets/ResolvedTickets'
import DeniedTickets from './components/AdminTickets/DeniedTickets'
import ManagePlayers from './components/AdminTickets/ManagePlayers'
import ThemeToggle from './ThemeToggle'

function App () {
  // eslint-disable-next-line no-unused-vars
  const [loadingPlayerFile, setLoadingPlayerFile] = useState(false)
  const [reportModalType, setReportModalType] = useState('')
  const [signInModalType, setSignInModalType] = useState('')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  return (
    <Router>
      <Header
        onOpenReportModal={() => setReportModalType('Submit')}
        onOpenSignInModal={() => setSignInModalType('SignIn')}
        modalType={''}
      />
      <ThemeToggle disabled currentTheme={theme} onThemeChange={handleThemeChange} isDisabled={true} />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="player/:player" element={<Players />} />
        <Route path="cases/:id" element={<Cases />}/>
        <Route path="admin/manage-tickets" element={<ManageTickets />} />
        <Route path="admin/resolved-tickets" element={<ResolvedTickets />} />
        <Route path="admin/denied-tickets" element={<DeniedTickets />} />
        <Route path="admin/manage-players" element={<ManagePlayers />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
      {loadingPlayerFile
        ? (
        <LoadingScreen />
          )
        : (
        <>
          <Modal
            isOpen={reportModalType === 'Submit'}
            onClose={() => setReportModalType('')}
            title="Report a Scammer"
            onSubmit={() => {
              setReportModalType('')
            }}
            modalType={reportModalType}
          />
          <Modal
            isOpen={signInModalType === 'SignIn'}
            onClose={() => setSignInModalType('')}
            title="Sign In"
            onSubmit={() => {
              setSignInModalType('')
            }}
            modalType={signInModalType}
          />
        </>
          )}
    </Router>
  )
}

export default App
