import React from 'react';
import '../../styles/AdminTicket.css?v=1';

function ManageTickets() {
  const manageTickets = {
    '1': {
      id: '1',
      description: 'The scammer, PlayerXYZ, attempted to scam by impersonating an administrator and requesting the victim\'s login information. The victim, GamerABC, wisely refused to share their details, avoiding the scam.',
      amount: '0',
      items: 'None',
      scammerName: 'ScammerXYZ',
      victimName: 'VictimABC',
      evidence: 'https://www.streamable.com/denied-link',
      evidenceStrength: 'moderate',
    },
    '2': {
      id: '2',
      description: 'The scammer, PlayerLMN, lured the victim, GamerDEF, into a dangerous area and attacked, resulting in the loss of valuable items. The victim reported the incident to administrators.',
      amount: '600m',
      items: 'Abyssal whip, Dragon defender',
      scammerName: 'ScammerLMN',
      victimName: 'VictimDEF',
      evidence: 'https://www.streamable.com/another-denied-link',
      evidenceStrength: 'strong',
    },
  };

  return (
    <div className="ticket-section">
      <h2>Manage Tickets</h2>
      <table className="ticket-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Items</th>
            <th>Scammer Name</th>
            <th>Victim Name</th>
            <th>Evidence</th>
            <th>Evidence Strength</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(manageTickets).map((ticket) => (
            <tr key={ticket.id} className="ticket-item">
              <td>{ticket.id}</td>
              <td>{ticket.description}</td>
              <td>{ticket.amount}</td>
              <td>{ticket.items}</td>
              <td>{ticket.scammerName}</td>
              <td>{ticket.victimName}</td>
              <td>
                <a href={ticket.evidence} target="_blank" rel="noopener noreferrer">
                  View Evidence
                </a>
              </td>
              <td>{ticket.evidenceStrength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTickets;
