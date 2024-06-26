import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchLatestCases, fetchLatestResolvedCases } from '../server/ticketService'
import '../styles/Ticker.css'
import { replaceItemNamesWithIcons } from '../utils/replaceItemNamesWithIcons'
import { BiListOl, BiListCheck } from 'react-icons/bi'

function Ticker () {
  const [latestCasesData, setLatestCasesData] = useState([])
  const [latestResolvedCasesData, setLatestResolvedCasesData] = useState([])
  const [expandedEntries, setExpandedEntries] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData () {
      try {
        const latestCases = await fetchLatestCases()
        const latestResolvedCases = await fetchLatestResolvedCases()

        setLatestCasesData(latestCases)
        setLatestResolvedCasesData(latestResolvedCases)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleViewCase = (id) => {
    navigate(`/cases/${id}`)
  }

  const handleEntryClick = (id) => {
    setExpandedEntries((prevExpandedEntries) => ({
      ...prevExpandedEntries,
      [id]: !prevExpandedEntries[id]
    }))
  }

  return (
    <div className="ticker">
      <div className="ticker-left">
        <h2>Latest Cases</h2>
        <div className="ticker-data">
          {latestCasesData.map((entry) => (
            <div key={entry.id}>
              <div
                className={`ticker-entry ${expandedEntries[entry.id] ? 'expanded' : ''}`}
                onClick={() => handleEntryClick(entry.id)}
                role="button"
                tabIndex={0}
              >
                <div className="ticker-name" style={{ color: 'red' }}>
                  {entry.scammerName}
                </div>
                <BiListOl className="ticker-svg" />
                <div className="ticker-offence">
                  <strong>Offence:</strong> {entry.scamType}
                </div>
                <div className="ticker-amount">
                  <strong>Amount: </strong>
                  <span className="ticker-gp">{entry.amount}</span>
                </div>
                {expandedEntries[entry.id] && (
                  <div className="ticker-items">
                    <strong>Items:</strong>{' '}
                    {replaceItemNamesWithIcons(entry.items)
                      .filter((item) => item)
                      .map((item, index, array) => (
                        <span key={index}>
                          {item}
                          {index < array.length - 1 && ' '}
                        </span>
                      ))}
                  </div>
                )}
                {expandedEntries[entry.id] && (
                  <div>
                    <strong>Repaid Debt:</strong>{' '}
                    <span className="ticker-gp">{entry.debtRepaid}</span>
                    <button className="view-case-button" onClick={() => handleViewCase(entry.id)}>
                      View Case
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-right">
        <h2>Latest Resolved Cases</h2>
        <div className="ticker-data">
          {latestResolvedCasesData.map((entry) => (
            <div key={entry.id}>
              <div
                className={`ticker-entry ${expandedEntries[entry.id] ? 'expanded' : ''}`}
                onClick={() => handleEntryClick(entry.id)}
                role="button"
                tabIndex={0}
              >
                <div className="ticker-name">{entry.scammerName}</div>
                <BiListCheck className="ticker-svg" />
                <div className="ticker-offence">
                  <strong>Offence:</strong> {entry.scamType}
                </div>
                <div className="ticker-amount">
                  <strong>Amount: </strong>
                  <span className="ticker-gp">{entry.amount}</span>
                </div>
                {expandedEntries[entry.id] && (
                  <div className="ticker-items">
                    <strong>Items:</strong>{' '}
                    {replaceItemNamesWithIcons(entry.items)
                      .filter((item) => item)
                      .map((item, index, array) => (
                        <span key={index}>
                          {item}
                          {index < array.length - 1 && ' '}
                        </span>
                      ))}
                  </div>
                )}
                {expandedEntries[entry.id] && (
                  <div>
                    <strong>Repaid Debt:</strong>{' '}
                    <span className="ticker-gp">{entry.debtRepaid}</span>
                    <button className="view-case-button" onClick={() => handleViewCase(entry.id)}>
                      View Case
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ticker
