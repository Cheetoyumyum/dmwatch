import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Players.css';

function Players() {
  const { player } = useParams();
  const [playerData, setPlayerData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const fakePlayerData = {
        playerName: player,
        cases: [
          { id: 1, title: 'Case 1', description: 'Teleported out of the DM' },
          { id: 2, title: 'Case 2', description: 'Imp Boxxed' },
        ],
      };
      setPlayerData(fakePlayerData);
      setLoading(false);
    }, 1000);
  }, [player]);

  const handleCaseClick = (caseId) => {
    navigate(`/cases/${caseId}`);
  };

  if (loading) {
    return <div>Loading player data...</div>;
  }

  return (
    <div className="players-container">
      <h1>{playerData.playerName}</h1>
      <div className="player-cases">
        <h2>Cases:</h2>
        <ul>
          {playerData.cases.map((caseItem) => (
            <li
              key={caseItem.id}
              className="case-item"
              onClick={() => handleCaseClick(caseItem.id)}
            >
              <strong>{caseItem.title}</strong>
              <p>{caseItem.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Players;
