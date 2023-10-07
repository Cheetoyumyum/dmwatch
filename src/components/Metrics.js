import React, { useState, useEffect } from 'react';
import { FaTasks, FaCheck, FaCoins, FaFileAlt } from 'react-icons/fa';
import '../styles/Metrics.css';
import { getAllTickets } from '../server/ticketService';

function convertToMillionsOrBillions(number) {
  if (number >= 1e12) {
    return (number / 1e12).toFixed(2) + 'T';
  } else if (number >= 1e9) {
    return (number / 1e9).toFixed(2) + 'B';
  } else if (number >= 1e6) {
    return (number / 1e6).toFixed(2) + 'M';
  } else {
    return number.toLocaleString() + ' M';
  }
}

function Metrics() {
  const [activeReports, setActiveReports] = useState(0);
  const [resolvedReports, setResolvedReports] = useState(0);
  const [totalGPRecovered, setTotalGPRecovered] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  useEffect(() => {
    async function fetchMetricsData() {
      try {
        const tickets = await getAllTickets();
        const activeReportsCount = tickets.filter((ticket) => ticket.status !== 'Resolved').length;
        const resolvedReportsCount = tickets.filter((ticket) => ticket.status === 'Resolved').length;
        const totalRecovered = tickets.reduce((total, ticket) => total + parseFloat(ticket.debtRepaid), 0);
        
        setActiveReports(activeReportsCount);
        setResolvedReports(resolvedReportsCount);
        setTotalGPRecovered(totalRecovered);
        setTotalSubmissions(tickets.length);
      } catch (error) {
        console.error('Error fetching metrics data:', error);
      }
    }

    fetchMetricsData();
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
          <div className="metric-number">{convertToMillionsOrBillions(totalGPRecovered)}</div>
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
