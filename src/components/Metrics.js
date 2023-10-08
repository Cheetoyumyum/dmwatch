import React, { useState, useEffect } from 'react';
import '../styles/Metrics.css';
import { getAllTickets } from '../server/ticketService';
import {ReactComponent as CheckmarkSVG} from '../assets/checkmark.svg';
import {ReactComponent as GoldSVG} from '../assets/gold.svg';
import {ReactComponent as TotalSVG} from '../assets/total.svg';
import {ReactComponent as FiledSVG} from '../assets/filed.svg';

function formatNumber(number) {
  return number.toLocaleString() + ' M';
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
            <FiledSVG height="48px" width="48px" />
          </div>
          <div className="metric-number">{activeReports.toLocaleString()}</div>
          <div className="metric-label">Active Reports</div>
        </div>

        <div className="metric resolved-reports">
          <div className="metric-icon">
            <CheckmarkSVG height="48px" width="48px"  />
          </div>
          <div className="metric-number">{resolvedReports.toLocaleString()}</div>
          <div className="metric-label">Resolved Reports</div>
        </div>

        <div className="metric">
          <div className="metric-icon">
            <GoldSVG height="48px" width="48px"  />
          </div>
          <div className="metric-number gp">{formatNumber(totalGPRecovered)}</div>
          <div className="metric-label">Total GP Recovered</div>
        </div>

        <div className="metric total-submissions">
        <div className="metric-icon">
          <TotalSVG height="48px" width="48px"  />
        </div>
          <div className="metric-number">{totalSubmissions.toLocaleString()}</div>
          <div className="metric-label">Total Submissions</div>
        </div>
      </div>
    </section>
  );
}

export default Metrics;
