import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import '../styles/Players.css?v=1';

function Players() {
  const { player } = useParams();
  const [playerData, setPlayerData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const fakePlayerData = {
        playerName: player,
        previousNames: ['Old Name 1', 'Old Name 2'],
        status: 'Scammer',
        cases: [
          { id: 1, title: 'Teled out', description: 'Teleported out of the DM', amount: '1.5b', victimName: 'Victim 1', evidenceStrength: 'weak' },
          { id: 2, title: 'Scammed', description: 'Imp Boxxed', amount: '0', victimName: 'Victim 2', evidenceStrength: 'moderate' },
          { id: 3, title: 'Bad Prayers during dm', description: 'Peepo', amount: '800m', victimName: 'Victim 3', evidenceStrength: 'strong' },
          { id: 4, title: 'Another Case', description: 'Another description', amount: '2.0b', victimName: 'Victim 4', evidenceStrength: 'weak' },
          { id: 5, title: 'New Case', description: 'New description', amount: '500m', victimName: 'Victim 5', evidenceStrength: 'moderate' },
          { id: 6, title: 'Yet Another Case', description: 'Yet another description', amount: '1.2b', victimName: 'Victim 6', evidenceStrength: 'strong' },
          { id: 7, title: 'Extra Case', description: 'Extra description', amount: '750m', victimName: 'Victim 7', evidenceStrength: 'weak' },
        ],
      };
      setPlayerData(fakePlayerData);
      setLoading(false);
    }, 1000);
  }, [player]);

  const handleCaseClick = (caseId) => {
    navigate(`/cases/${caseId}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="players-container">
      <div className="player-card">
        <h1>RSN: {playerData.playerName}</h1>
        <p>Previous Names: {playerData.previousNames.join(', ')}</p>
        <p>Status: {playerData.status}</p>
      </div>
      <h2 className='caseTitle'>Cases</h2>
      <div className="case-cards">
        {playerData.cases.map((caseItem) => (
        <div key={caseItem.id} className="case-card" onClick={() => handleCaseClick(caseItem.id)}>
          <h3>
            <span className="case-title">{caseItem.title}</span>
            <div className={`evidence-meter ${caseItem.evidenceStrength}`}>
              <div className="evidence-bar">
                <div className="evidence-bar-fill"></div>
              </div>
            </div>
          </h3>
          <p>Description: {caseItem.description}</p>
          <p>Amount: {caseItem.amount}</p>
          <p>Victim Name: {caseItem.victimName}</p>
          <small>Case id:</small><small style={{ color: 'gray' }}>{caseItem.id}</small>
        </div>
      ))}
      </div>
      <button onClick={handleBack} className="back-link">
        Back
      </button>
    </div>
  );
}

export default Players;
