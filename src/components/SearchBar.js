import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchBar.css';

function SearchBar({ onLoadPlayerFile }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const fakeData = [
    {
      caseId: '123',
      player: 'Player123',
    },
    {
      caseId: '456',
      player: '1154',
    },
    {
      caseId: '789',
      player: 'Gamer789',
    },
    {
      caseId: '1154',
      player: 'GBGShooter',
    },
  ];

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredResults = fakeData.filter((data) =>
      data.player.toLowerCase() === searchTerm || data.caseId === searchTerm
    );

    if (!isNaN(searchTerm)) {
      filteredResults.push({ caseId: searchTerm });
    }

    setSearchResults(filteredResults);
  };

  const handlePlayerClick = (result) => {
    if (result.player) {
      console.log(`Navigating to /player/${result.player}`);
      navigate(`/player/${result.player}`);
    } else if (result.caseId) {
      console.log(`Navigating to /case/${result.caseId}`);
      navigate(`/case/${result.caseId}`);
    }
  };

  return (
    <div className="search-bar-container">
      {isHomePage ? (
        <input
          type="text"
          placeholder="Search by player name or case details"
          value={searchTerm}
          onChange={handleSearch}
        />
      ) : (
        <input
          type="text"
          placeholder="Search by case details"
          value={searchTerm}
          onChange={handleSearch}
        />
      )}
      <ul className="search-results">
        {searchResults.map((result, index) => (
          <li key={index} className="search-result-item">
            {result.player ? (
              <Link to={`/player/${result.player}`} onClick={() => handlePlayerClick(result)}>
                <span>Player: {result.player}</span>
              </Link>
            ) : (
              <div>
                <Link to={`/case/${result.caseId}`} onClick={() => handlePlayerClick(result)}>
                  <span>Case: {result.caseId}</span>
                </Link>
                {fakeData.find((data) => data.caseId === result.caseId)?.player && (
                  <small style={{ color: 'gray' }}> {fakeData.find((data) => data.caseId === result.caseId)?.player}</small>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
