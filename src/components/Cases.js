import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getAllTickets } from '../server/ticketService';
import Error404 from './Error404';
import '../styles/Cases.css?v=1';
import LoadingScreen from './LoadingScreen';
import { replaceItemNamesWithIcons } from '../utils/replaceItemNamesWithIcons';

function Cases() {
  const { id } = useParams();
  const [caseData, setCaseData] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const tickets = await getAllTickets();
        const ticket = tickets.find((ticket) => ticket.id === id);

        if (ticket) {
          setCaseData(ticket);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotFound(true);
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <LoadingScreen />;
  }
  
  if (notFound) {
    return <Error404 />;
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
      <h1>Case {caseData.id}</h1>
      <div className={`evidence-meter ${caseData.evidenceStrength}`}>
        <div className="evidence-bar-fill"></div>
      </div>
      <div className="case-details">
        <p>
          <strong>ID:</strong> {caseData.id}<br />
          <strong>Description:</strong> {caseData.description}<br />
          <strong>Amount:</strong> {caseData.amount}<br />
          <strong>Items:</strong> {replaceItemNamesWithIcons(caseData.items)
            .filter((item) => item)
            .map((item, index, array) => (
              <span key={index}>
                {item}
                {index < array.length - 1 && ' '}
              </span>
            ))}
          <br />
          <strong>Scammer Name:</strong> {caseData.scammerName}<br />
          <strong>Victim Name:</strong> {caseData.victimName}<br />
          <strong>Evidence:</strong> <a href={caseData.evidence} target="_blank" rel="noopener noreferrer">{caseData.evidence}</a><br />
          <strong>Status:</strong> {caseData.status}<br />
          <strong>Scam Type:</strong> {caseData.scamType}<br />
          <strong>Previous Names:</strong> {caseData.previousNames}
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
