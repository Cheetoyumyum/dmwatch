import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLatestCases, fetchLatestResolvedCases } from '../server/ticketService'; 
import '../styles/Ticker.css';
import { replaceItemNamesWithIcons } from '../utils/replaceItemNamesWithIcons';

function Ticker() {
  const [latestCasesData, setLatestCasesData] = useState([]);
  const [latestResolvedCasesData, setLatestResolvedCasesData] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const latestCases = await fetchLatestCases();
        const latestResolvedCases = await fetchLatestResolvedCases();

        setLatestCasesData(latestCases);
        setLatestResolvedCasesData(latestResolvedCases);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleEntryClick = (id) => {
    setSelectedEntry(id);
    navigate(`/cases/${id}`);
  };

  return (
    <div className="ticker">
      <div className="ticker-left">
        <h2>Latest Cases</h2>
        <div className="ticker-data">
          {latestCasesData.map((entry) => (
            <a
              className={`ticker-entry ${selectedEntry === entry.id ? 'selected' : ''}`}
              key={entry.id}
              onClick={() => handleEntryClick(entry.id)}
            >
              <div className="ticker-name">{entry.scammerName}</div>
              <div className="ticker-offence">
                <strong>Offence:</strong> {entry.scamType}
              </div>
              <div className="ticker-amount">
                <strong>Amount:</strong> {entry.amount}
              </div>
              <div className="ticker-items">
                <strong>Items:</strong> {replaceItemNamesWithIcons(entry.items)
                  .filter((item) => item)
                  .map((item, index, array) => (
                    <span key={index}>
                      {item}
                      {index < array.length - 1 && ' '}
                    </span>
                  ))}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="ticker-right">
        <h2>Latest Resolved Cases</h2>
        <div className="ticker-data">
          {latestResolvedCasesData.map((entry) => (
            <a
              className={`ticker-entry ${selectedEntry === entry.id ? 'selected' : ''}`}
              key={entry.id}
              onClick={() => handleEntryClick(entry.id)}
            >
              <div className="ticker-name">{entry.scammerName}</div>
              <div className="ticker-offence">
                <strong>Offence:</strong> {entry.scamType}
              </div>
              <div className="ticker-amount">
                <strong>Amount:</strong> {entry.amount}
              </div>
              <div className="ticker-items">
                <strong>Items:</strong> {replaceItemNamesWithIcons(entry.items)
                  .filter((item) => item)
                  .map((item, index, array) => (
                    <span key={index}>
                      {item}
                      {index < array.length - 1 && ' '}
                    </span>
                  ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticker;
