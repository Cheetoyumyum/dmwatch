import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchLatestCases, fetchLatestResolvedCases } from '../server/ticketService'
import '../styles/Ticker.css'
import { replaceItemNamesWithIcons } from '../utils/replaceItemNamesWithIcons'
import { ReactComponent as ResolvedSVG } from '../assets/settingsCheckmark.svg'
import { ReactComponent as InvestigateSVG } from '../assets/investigate.svg'

function Ticker () {
  const [latestCasesData, setLatestCasesData] = useState([])
  const [latestResolvedCasesData, setLatestResolvedCasesData] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
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

  const handleEntryClick = (id) => {
    if (expandedEntries[id]) {
      setSelectedEntry(id)
      navigate(`/cases/${id}`)
    } else {
      setExpandedEntries((prevExpandedEntries) => ({
        ...prevExpandedEntries,
        [id]: !prevExpandedEntries[id]
      }))
    }
  }

  return (
    <div className="ticker">
      <div className="ticker-left">
        <h2>Latest Cases</h2>
        <div className="ticker-data">
          {latestCasesData.map((entry) => (
            <div
              className={`ticker-entry ${selectedEntry === entry.id ? 'selected' : ''} ${
                expandedEntries[entry.id] ? 'expanded' : ''
              }`}
              key={entry.id}
              onClick={() => handleEntryClick(entry.id)}
              role="button"
              tabIndex={0}
            >
              <div className="ticker-name" style={{ color: 'red' }}>
                {entry.scammerName}
              </div>
              <InvestigateSVG className="ticker-svg" width="22" height="29" />
              <div className="ticker-offence">
                <strong>Offence:</strong> {entry.scamType}
              </div>
              <div className="ticker-amount">
                <strong>Amount: </strong>
                <span className="ticker-gp">{entry.amount}</span>
              </div>
              {expandedEntries[entry.id]
                ? (
                <>
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
                  <strong>Repaid Debt:</strong>{' '}
                  <span className="ticker-gp">{entry.debtRepaid}</span>
                </>
                  )
                : null}
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-right">
        <h2>Latest Resolved Cases</h2>
        <div className="ticker-data">
          {latestResolvedCasesData.map((entry) => (
            <div
              className={`ticker-entry ${selectedEntry === entry.id ? 'selected' : ''} ${
                expandedEntries[entry.id] ? 'expanded' : ''
              }`}
              key={entry.id}
              onClick={() => handleEntryClick(entry.id)}
              role="button"
              tabIndex={0}
            >
              <div className="ticker-name">{entry.scammerName}</div>
              <ResolvedSVG className="ticker-svg" width="24" height="24" />
              <div className="ticker-offence">
                <strong>Offence:</strong> {entry.scamType}
              </div>
              <div className="ticker-amount">
                <strong>Amount:</strong>{' '}
                <span className="ticker-gp">{entry.amount}</span>
              </div>
              {expandedEntries[entry.id]
                ? (
                <>
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
                  <strong>Repaid Debt:</strong>{' '}
                  <span className="ticker-gp">{entry.debtRepaid}</span>
                </>
                  )
                : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ticker
