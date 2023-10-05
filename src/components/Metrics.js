import React, { useState, useEffect } from 'react';
import { FaTasks, FaCheck, FaCoins, FaFileAlt } from 'react-icons/fa';
import '../styles/Metrics.css';

function Metrics() {
  // Function to generate a random number within a specified range
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [activeReports, setActiveReports] = useState(generateRandomNumber(6000, 80000));
  const [resolvedReports, setResolvedReports] = useState(generateRandomNumber(800, 8079));
  const [totalGPRecovered, setTotalGPRecovered] = useState(generateRandomNumber(10000000, 120968249));
  const [totalSubmissions, setTotalSubmissions] = useState(generateRandomNumber(400, 5079));

  useEffect(() => {
    // Function to update a metric with a random increment between 1 and 20
    const updateMetric = (setter, min, max) => {
      const randomIncrement = generateRandomNumber(1, 20);
      setter((prevValue) => {
        return prevValue + randomIncrement;
      });
    };

    // Update the metrics randomly between 1-20 every second
    const interval = setInterval(() => {
      updateMetric(setActiveReports, 1, 20);
      updateMetric(setResolvedReports, 1, 20);
      updateMetric(setTotalSubmissions, 1, 20);
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval when the component unmounts
  }, []);

  return (
    <section className="metrics-container">
      <div className="metrics-text">
        <p>
          Providing a transparent platform for the RuneScape community to report,
          track & retrieve stolen wealth.
        </p>
      </div>
      <div className="metrics-items">

        <div className="metric active-reports">
          <div className="metric-icon">
            <FaTasks />
          </div>
          <div className="metric-number">{activeReports.toLocaleString()}</div>
          <div className="metric-label">Active Reports</div>
        </div>

        <div className="metric resolved-reports">
          <div className="metric-icon">
            <FaCheck />
          </div>
          <div className="metric-number">{resolvedReports.toLocaleString()}</div>
          <div className="metric-label">Resolved Reports</div>
        </div>

        <div className="metric">
          <div className="metric-icon">
            <FaCoins />
          </div>
          <div className="metric-number">{totalGPRecovered.toLocaleString()} M</div>
          <div className="metric-label">Total GP Recovered</div>
        </div>

        <div className="metric total-submissions">
          <div className="metric-icon">
            <FaFileAlt />
          </div>
          <div className="metric-number">{totalSubmissions.toLocaleString()}</div>
          <div className="metric-label">Total Submissions</div>
        </div>
      </div>
    </section>
  );
}

export default Metrics;
