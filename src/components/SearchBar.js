import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/SearchBar.css';
import { getAllTickets, getPlayerByName } from '../server/ticketService';

function SearchBar({ onLoadPlayerFile }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    try {
      const tickets = await getAllTickets();
      const filteredResults = tickets.filter((ticket) =>
        ticket.scammerName.toLowerCase().includes(searchTerm) || ticket.id.includes(searchTerm)
      );
      setSearchResults(filteredResults);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePlayerClick = async (result) => {
    if (result.scammerName) {
      try {
        const playerInfo = await getPlayerByName(result.scammerName);
        if (playerInfo) {
          navigate(`/player/${result.scammerName}`);
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    } else if (result.id) {
      navigate(`/cases/${result.id}`);
    }
  };
  
  const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    if (!isNaN(searchTerm)) {
      navigate(`/cases/${searchTerm}`);
    } else {
      navigate(`/player/${searchTerm}`);
    }
  }
  };
  

  return (
    <div className="search-bar-container">
      {isHomePage ? (
        <input
          type="text"
          placeholder="Search by player name or case details"
          className='search-input'
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
      ) : (
        <input
          type="text"
          placeholder="Search by case details"
          className='search-input'
          value={searchTerm}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
        />
      )}
      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="search-result-item"
              onClick={() => handlePlayerClick(result)}
            >
              <Link to={result.scammerName ? `/player/${result.scammerName}` : `/cases/${result.id}`}>
                {result.scammerName ? (
                  <span>Player: {result.scammerName}</span>
                ) : (
                  <div>
                    <span>Case: {result.id || result.scammerName}</span>
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
