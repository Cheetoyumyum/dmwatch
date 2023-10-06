import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Cases.css?v=1';
import LoadingScreen from './LoadingScreen';

function Cases() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      const fakeCaseData = {
        '1': {
          id: '1',
          title: 'Case 12345',
          description: 'The scammer, Player123, engaged in a deathmatch but intentionally left the fight by teleporting out before it was over. This behavior goes against the rules of fair play in the game. The victim, Gamer789, lost valuable items, including a Dragon Claws, Twisted Bow, and a Party Hat, due to the scammer\'s actions.',
          amount: '1.5b',
          items: 'Dragon claws, Twisted bow, Party hat',
          scammerName: 'Scammer123',
          victimName: 'Victim456',
          evidence: 'https://www.streamable.com/link-to-evidence',
          evidenceStrength: 'strong',
        },
        '2': {
          id: '2',
          title: 'Case 67890',
          description: 'The scammer, Player456, attempted to scam by trading fake items. The victim, Gamer321, recognized the scam attempt and canceled the trade, avoiding the loss of valuable items.',
          amount: '0',
          items: 'None',
          scammerName: 'Scammer456',
          victimName: 'Victim321',
          evidence: 'https://www.streamable.com/another-link',
          evidenceStrength: 'moderate',
        },
        '3': {
          id: '3',
          title: 'Case 98765',
          description: 'The scammer, Player789, lured the victim, Gamer654, into the Wilderness and attacked, resulting in the loss of valuable items. The scammer then fled the scene.',
          amount: '800m',
          items: 'Saradomin godsword, Armadyl crossbow',
          scammerName: 'Scammer789',
          victimName: 'Victim654',
          evidence: 'https://www.streamable.com/yet-another-link',
          evidenceStrength: 'weak',
        },
        // Add more cases here
      };

      // Check if the case ID exists in fakeCaseData
      if (id in fakeCaseData) {
        setCaseData(fakeCaseData[id]);
        setLoading(false);
      } else {
        // Handle case not found
        setNotFound(true);
        setLoading(false);
      }
    }, 1000);
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (notFound) {
    return (
      <div className="error-message">
        <div className="error-title">Case not found</div>
        <div className="error-code">404</div>
        <small>If what you are looking for should exist, please contact our admins.</small>
        <br/>
        <br/>
        <button className="back-link" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
    );
  }  

  const handleBack = () => {
    const previousURL = location.state ? location.state.from : '/';
    navigate(previousURL);
  };

  const handleGoToPlayer = () => {
    const playerURL = `/player/${caseData.scammerName}`;
    navigate(playerURL);
  };

  return (
    <div className="cases-container">
      <h1>{caseData.title}</h1>
      <div className={`evidence-meter ${caseData.evidenceStrength}`}>
        <div className="evidence-bar-fill"></div>
      </div>
      <div className="case-details">
        <p>
          <strong>ID:</strong> {caseData.id}<br />
          <strong>Title:</strong> {caseData.title}<br />
          <strong>Description:</strong> {caseData.description}<br />
          <strong>Amount:</strong> {caseData.amount}<br />
          <strong>Items:</strong> {caseData.items}<br />
          <strong>Scammer Name:</strong> {caseData.scammerName}<br />
          <strong>Victim Name:</strong> {caseData.victimName}<br />
          <strong>Evidence:</strong> <a href={caseData.evidence} target="_blank" rel="noopener noreferrer">{caseData.evidence}</a>
        </p>
      </div>
      <button onClick={handleBack} className="back-link">
        Back
      </button>
      <button onClick={handleGoToPlayer} className="back-link">
        Go to Player
      </button>
    </div>
  );
}

export default Cases;
