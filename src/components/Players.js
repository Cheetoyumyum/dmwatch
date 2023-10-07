import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { getPlayerByName } from '../server/ticketService';
import '../styles/Players.css?v=1';
import Error404 from './Error404';

function Players() {
  const { player } = useParams();
  const [playerData, setPlayerData] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const playerInfo = await getPlayerByName(player);
        if (playerInfo) {
          setPlayerData(playerInfo);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
    

    fetchData();
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
  
  if (notFound) {
    return <Error404 />;
  }
  
  return (
    <div className="players-container">
      <div className="player-card">
        <h1><strong>RSN:</strong> {playerData.scammerName}</h1>
        <p><strong>Status:</strong> {playerData.status}</p>
        <p><strong>Previous Names:</strong> {playerData.previousNames?.join(', ')}</p>
      </div>
      <h2 className="caseTitle">Cases</h2>
      <div className="case-cards">
        {playerData.cases.map((caseItem) => (
          <div key={caseItem.id} className="case-card" onClick={() => handleCaseClick(caseItem.id)}>
            <h3>
              <strong>Case:</strong> {caseItem.id}
            </h3>
            <div className={`evidence-meter ${caseItem.evidenceStrength}`}>
              <div className="evidence-bar">
                <div className="evidence-bar-fill"></div>
              </div>
            </div>
            <p><strong>Description:</strong> {caseItem.description}</p>
            <p><strong>Amount:</strong> {caseItem.amount}</p>
            <p><strong>Victim Name:</strong> {caseItem.victimName}</p>
            <small>Case id: </small>
            <small style={{ color: 'gray' }}>{caseItem.id}</small>
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
