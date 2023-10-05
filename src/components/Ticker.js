import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Ticker.css';

function Ticker() {
  const latestCasesData = [
    {
      id: 1,
      name: 'GBGShooter',
      offence: 'Offence (ex: Teleported out, did not finish fight)',
      amount: 'Amount (500m + DH Set)',
    },
    {
      id: 2,
      name: 'BIKERS',
      offence: 'Offence (ex: Teleported out, did not finish fight)',
      amount: 'Amount (500m + DH Set)',
    },
    {
      id: 3,
      name: 'FRED',
      offence: 'Offence (ex: Teleported out, did not finish fight)',
      amount: 'Amount (500m + DH Set)',
    },
  ];

  const latestResolvedCasesData = [
    {
      id: 4,
      name: 'Devorek',
      offence: 'Offence (ex: Teleported out, did not finish fight)',
      amount: 'Amount (500m + DH Set)',
    },
    {
      id: 5,
      name: 'Bos',
      offence: 'Offence (ex: Teleported out, did not finish fight)',
      amount: 'Amount (500m + DH Set)',
    },
    {
      id: 6,
      name: 'Smoke',
      offence: 'Offence (ex: Teleported out, did not finish fight)',
      amount: 'Amount (500m + DH Set)',
    },
  ];

  const [selectedEntry, setSelectedEntry] = useState(null);
  const navigate = useNavigate();

  const handleEntryClick = (id) => {
    setSelectedEntry(id);
    navigate(`/cases?id=${id}`);
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
              <div className="ticker-name">{entry.name}</div>
              <div className="ticker-offence">{entry.offence}</div>
              <div className="ticker-amount">{entry.amount}</div>
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
              <div className="ticker-name">{entry.name}</div>
              <div className="ticker-offence">{entry.offence}</div>
              <div className="ticker-amount">{entry.amount}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticker;
