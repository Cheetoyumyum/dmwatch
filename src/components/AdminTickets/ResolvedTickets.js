import React, { useState } from 'react';
import '../../styles/AdminTicket.css?v=1';

function ResolvedTickets() {
  // Use actual data retrieval logic here. :)
  const [resolvedTickets, setResolvedTickets] = useState({
    '1': {
      id: '1',
      description: 'The scammer, PlayerXYZ, attempted to scam by impersonating an administrator and requesting the victim\'s login information. The victim, GamerABC, wisely refused to share their details, avoiding the scam.',
      amount: '0',
      items: 'None',
      scammerName: 'ScammerXYZ',
      victimName: 'VictimABC',
      evidence: 'https://www.streamable.com/denied-link',
      evidenceStrength: 'moderate',
      status: 'Open',
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
      status: 'Resolved',
    },
  });

  const handleChange = (ticketId, field, value) => {
    const updatedTickets = { ...resolvedTickets };
    updatedTickets[ticketId][field] = value;
    setResolvedTickets(updatedTickets);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return '#fff3cd';
      case 'Resolved':
        return '#d4edda';
      case 'New':
        return '#d1ecf1';
      case 'Denied':
        return '#f8d7da';
      default:
        return '';
    }
  };

  return (
    <div className="resolved-tickets">
      <h2>Resolved Tickets</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
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
          {Object.values(resolvedTickets).map((ticket) => (
            <tr key={ticket.id} style={{ backgroundColor: getStatusColor(ticket.status) }}>
              <td><p>{ticket.id}</p></td>
              <td>
                <select
                  value={ticket.status}
                  onChange={(e) => handleChange(ticket.id, 'status', e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="Resolved">Resolved</option>
                  <option value="New">New</option>
                  <option value="Denied">Denied</option>
                </select>
              </td>
              <td>
                <textarea
                  value={ticket.description}
                  onChange={(e) => handleChange(ticket.id, 'description', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={ticket.amount}
                  onChange={(e) => handleChange(ticket.id, 'amount', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={ticket.items}
                  onChange={(e) => handleChange(ticket.id, 'items', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={ticket.scammerName}
                  onChange={(e) => handleChange(ticket.id, 'scammerName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={ticket.victimName}
                  onChange={(e) => handleChange(ticket.id, 'victimName', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="url"
                  value={ticket.evidence}
                  onChange={(e) => handleChange(ticket.id, 'evidence', e.target.value)}
                />
              </td>
              <td>
                <select
                  value={ticket.evidenceStrength}
                  onChange={(e) => handleChange(ticket.id, 'evidenceStrength', e.target.value)}
                >
                  <option value="strong">Strong</option>
                  <option value="moderate">Moderate</option>
                  <option value="weak">Weak</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResolvedTickets;
