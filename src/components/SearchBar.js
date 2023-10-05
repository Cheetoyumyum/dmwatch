import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

function SearchBar({ onLoadPlayerFile }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // Initialize as an empty array
  const [selectedPlayer, setSelectedPlayer] = useState('');

  const fakeData = [
    'Player123',
    'User456',
    'Gamer789',
    'ProPlayer',
    'RuneScapeMaster',
    'EpicGamer',
    'NoobPlayer',
    'SkillfulPlayer',
  ];

  const navigate = useNavigate();

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filteredResults = fakeData.filter((name) =>
      name.toLowerCase().includes(searchTerm)
    );

    setSearchResults(filteredResults);
  };

  const handlePlayerClick = (player) => {
    setSelectedPlayer(player);
    onLoadPlayerFile(true);
    setTimeout(() => {
      onLoadPlayerFile(false);
    }, 2000);

    navigate(`/users?user=${player}`);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by player name"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="search-results">
        {searchResults.map((result, index) => (
          <li key={index}>
            <Link
              to={`/users?user=${result}`}
              onClick={() => handlePlayerClick(result)}
            >
              {result}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
