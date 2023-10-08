import React, { useState, useEffect } from 'react';
import '../../styles/AdminTicket.css?v=1';
import { getAllTickets, updateTicketById } from '../../server/ticketService';

function ResolvedTickets() {
  const [resolvedTickets, setResolvedTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    getAllTickets()
      .then((tickets) => {
        const filteredResolvedTickets = tickets
          .filter((ticket) => ticket.status === 'Resolved')
          .sort((a, b) => b.id - a.id);

        setResolvedTickets(filteredResolvedTickets);
        setFilteredTickets(filteredResolvedTickets);
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error);
      });
  }, []);

  const handleChange = (ticketId, field, value) => {
    const updatedTickets = resolvedTickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, [field]: value };
      }
      return ticket;
    });

    setResolvedTickets(updatedTickets);
  };

  const handleSave = (ticketId) => {
    const ticketToUpdate = resolvedTickets.find((ticket) => ticket.id === ticketId);

    if (ticketToUpdate) {
      updateTicketById(ticketId, ticketToUpdate)
        .then((updatedTicket) => {
          if (updatedTicket) {
            console.log(`Ticket ${ticketId} saved successfully.`);
          } else {
            console.error(`Ticket ${ticketId} not found.`);
          }
        })
        .catch((error) => {
          console.error(`Error saving ticket ${ticketId}: ${error.message}`);
        });
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTickets(resolvedTickets);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = resolvedTickets.filter((ticket) => {
        let searchField = '';
        if (tag === 'id:') {
          searchField = ticket.id;
        } else if (tag === 'rsn:') {
          searchField = `${ticket.scammerName.toLowerCase()} ${ticket.victimName.toLowerCase()}`;
        } else {
          searchField = `${ticket.id} ${ticket.scammerName.toLowerCase()} ${ticket.victimName.toLowerCase()} ${ticket.amount}`;
        }

        return searchField.includes(searchTermLower);
      });
      setFilteredTickets(filtered);
    }
  }, [searchTerm, resolvedTickets, tag]);

  const toggleTag = (selectedTag) => {
    setTag(tag === selectedTag ? '' : selectedTag);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return '#fff3cd';
      case 'Resolved':
        return '#d4edda';
      case 'New':
        return '#d1ecf1';
      case 'Resolved':
        return '#f8d7da';
      default:
        return '';
    }
  };

  return (
    <div className="resolved-tickets">
      <h2>Resolved Tickets</h2>
      <div className='SearchContainer'>
        <input
          className='TicketSearch'
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => toggleTag('id:')}
          className={tag === 'id:' ? 'active' : ''}
        >
          id
        </button>
        <button
          onClick={() => toggleTag('rsn:')}
          className={tag === 'rsn:' ? 'active' : ''}
        >
          rsn
        </button>
      </div>
      <div className="card-container">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card" style={{ borderColor: getStatusColor(ticket.status) }}>
            <div className="card-header">
              <span>ID: {ticket.id}</span>
              <select
                value={ticket.status}
                onChange={(e) => handleChange(ticket.id, 'status', e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="Resolved">Resolved</option>
                <option value="New">New</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div className="card-body">
              <div className="field">
                <label>Description</label>
                <textarea
                  value={ticket.description}
                  onChange={(e) => handleChange(ticket.id, 'description', e.target.value)}
                  rows="5"
                />
              </div>
              <div className="field">
                <label>Amount</label>
                <input
                  type="text"
                  value={ticket.amount}
                  onChange={(e) => handleChange(ticket.id, 'amount', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Items</label>
                <input
                  type="text"
                  value={ticket.items}
                  onChange={(e) => handleChange(ticket.id, 'items', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Scammer Name</label>
                <input
                  type="text"
                  value={ticket.scammerName}
                  onChange={(e) => handleChange(ticket.id, 'scammerName', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Victim Name</label>
                <input
                  type="text"
                  value={ticket.victimName}
                  onChange={(e) => handleChange(ticket.id, 'victimName', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Evidence</label>
                <input
                  type="text"
                  value={ticket.evidence}
                  onChange={(e) => handleChange(ticket.id, 'evidence', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Evidence Strength</label>
                <select
                  value={ticket.evidenceStrength}
                  onChange={(e) => handleChange(ticket.id, 'evidenceStrength', e.target.value)}
                >
                  <option value="strong">Strong</option>
                  <option value="moderate">Moderate</option>
                  <option value="weak">Weak</option>
                </select>
              </div>
              <div className="field">
                <label>Type of Scam</label>
                <select
                  value={ticket.scamType}
                  onChange={(e) => handleChange(ticket.id, 'scamType', e.target.value)}
                >
                  <option value="Disqualified">Disqualified</option>
                  <option value="Teleported out">Teleported out</option>
                  <option value="Ate during fight">Ate during fight</option>
                  <option value="Prayed">Prayed</option>
                </select>
              </div>
              <div className="field">
                <label>Debt Repaid (GP)</label>
                <input
                  type="text"
                  value={ticket.debtRepaidGB}
                  onChange={(e) => handleChange(ticket.id, 'debtRepaidGB', e.target.value)}
                />
              </div>
              <button
                onClick={() => handleSave(ticket.id)}
                className="save-button"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ResolvedTickets;
