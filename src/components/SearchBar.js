import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchBar.css';

function SearchBar({ onLoadPlayerFile }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');

  // Generate fake case data for testing
  const fakeData = [
    {
      caseId: '123',
      player: 'Player123',
      amount: '200m',
      offence: 'Teleported out',
    },
    {
      caseId: '456',
      player: 'User456',
      amount: '500m',
      offence: 'Did not finish fight',
    },
    {
      caseId: '789',
      player: 'Gamer789',
      amount: '300m',
      offence: 'Rule violation',
    },
    // Add more fake data entries as needed
  ];

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredResults = fakeData.filter((data) =>
      data.player.toLowerCase().includes(searchTerm)
    );

    setSearchResults(filteredResults);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    onLoadPlayerFile(true);
    setTimeout(() => {
      onLoadPlayerFile(false);
    }, 2000);

    navigate(`/users?user=${player.player}`);
  };

  return (
    <div className="search-bar-container">
      {isHomePage ? (
        <input
          type="text"
          placeholder="Search by player name"
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
            <Link
              to={isHomePage ? `/users?user=${result.player}` : `/admin/cases/${result.caseId}`}
              onClick={() => handlePlayerClick(result)}
            >
              {isHomePage ? (
                result.player
              ) : (
                <div>
                  <div>CaseID: {result.caseId}</div>
                  <div>Player: {result.player}</div>
                  <div>Amount: {result.amount}</div>
                  <div>Offence: {result.offence}</div>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
