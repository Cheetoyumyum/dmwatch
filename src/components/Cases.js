import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getAllTickets } from '../server/ticketService'
import Error404 from './Error404'
import '../styles/Cases.css?v=1'
import LoadingScreen from './LoadingScreen'
import { replaceItemNamesWithIcons } from '../utils/replaceItemNamesWithIcons'

function Cases () {
  const { id } = useParams()
  const [caseData, setCaseData] = useState({})
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    async function fetchData () {
      try {
        const tickets = await getAllTickets()
        const ticket = tickets.find((ticket) => ticket.id === id)

        if (ticket) {
          setCaseData(ticket)
          setLoading(false)
        } else {
          setNotFound(true)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setNotFound(true)
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <LoadingScreen />
  }

  if (notFound) {
    return <Error404 />
  }

  const handleBack = () => {
    const previousURL = location.state ? location.state.from : '/'
    navigate(previousURL)
  }

  const handleGoToPlayer = () => {
    const playerURL = `/player/${caseData.scammerName}`
    navigate(playerURL)
  }

  return (
    <div className="cases-container">
      <div className="case-content">
        <div className="case-details">
            <strong>Amount (GP)</strong>
            <div className="text-content">
               {caseData.amount}
            </div>
            <strong>Items</strong>
            <div className="text-content">
              {replaceItemNamesWithIcons(caseData.items)
                .filter((item) => item)
                .map((item, index, array) => (
                  <span key={index}>
                    {item}
                    {index < array.length - 1 && ' '}
                  </span>
                ))}
            </div>
            <strong>Scammer Name</strong>
            <div className="text-content">
               {caseData.scammerName}
            </div>
            <strong>Victim Name</strong>
            <div className="text-content">
               {caseData.victimName}
            </div>
            <strong>Evidence</strong>
            <div className="text-content">
              <a
                href={caseData.evidence}
                target="_blank"
                rel="noopener noreferrer"
              >
                {caseData.evidence}
              </a>
            </div>
            <strong>Status</strong>
            <div className="text-content">
              {caseData.status}
            </div>
            <strong>Scam Type</strong>
            <div className="text-content">
               {caseData.scamType}
            </div>
            <strong>Previous Names</strong>
            <div className="text-content">
              {caseData.previousNames}
            </div>
            <strong>Repaid Debt</strong>
            <div className="text-content">
               {caseData.debtRepaid}
            </div>
        </div>
        <div className="evidence-container">
          <h1>Case {caseData.id}</h1>
          <div className='case-description'>
                {caseData.description}
          </div>
          <video
            title={`Case ${caseData.id} Video`}
            controls
            style={{ maxWidth: '80%', height: 'auto' }}
          >
            <source src="/videos/1fj268.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="button-container">
        <button onClick={handleGoToPlayer} className="nav-button">
          Go to Player
        </button>
        <button onClick={handleBack} className="nav-button">
          Back
        </button>
      </div>
      <strong className="id-label">ID: {caseData.id}</strong>
    </div>
  )
}

export default Cases
