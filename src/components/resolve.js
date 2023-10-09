import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

function ResolveReport() {
  const { id } = useParams();
  const [reportData, setReportData] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [errorShown, setErrorShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = checkUserLoggedInWithOAuth2();

    if (isUserLoggedIn) {
      setUserLoggedIn(true);
      const report = getReportDataById(id);
      setReportData(report);
    } else {
      if (!errorShown) {
        alert('You are not logged in, please log in to Resolve a report.');
        setErrorShown(true);
      }
      navigate('/');
    }
  }, [id, navigate, errorShown]);

  const checkUserLoggedInWithOAuth2 = () => {
    return false; // Replace with your OAuth2 logic
  };

  const getReportDataById = (reportId) => {
    const reports = [
      // report data here? or whatevers the best way to handle reports.
    ];

    return reports.find((report) => report.id === reportId);
  };

  const handleResolve = () => {
  };

  if (userLoggedIn && reportData) {
    return (
      <div>
        <h1>Resolve Report #{reportData.id}</h1>
        <p>
          <strong>Description:</strong> {reportData.description}
        </p>
        <button onClick={handleResolve}>Resolve Report</button>
      </div>
    );
  } else if (errorShown) {
    return <div>Error: You are not logged in.</div>;
  } else if (!userLoggedIn) {
    return <LoadingScreen />;
  }
}

export default ResolveReport;
