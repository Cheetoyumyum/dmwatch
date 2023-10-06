import React, { useState, useEffect } from 'react';
import '../../styles/AdminTicket.css?v=1';

function DeniedTickets() {
  const [deniedTickets, setDeniedTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    // Simulated data for Denied tickets
    const deniedTicketsData = [
      {
        id: '1',
        description:
          'The scammer, PlayerXYZ, attempted to scam by impersonating an administrator and requesting the victim\'s login information. The victim, GamerABC, wisely refused to share their details, avoiding the scam.',
        amount: '0',
        items: 'None',
        scammerName: 'ScammerXYZ',
        victimName: 'VictimABC',
        evidence: 'https://www.streamable.com/denied-link',
        evidenceStrength: 'moderate',
        status: 'Denied',
        scamType: 'Disqualified',
      },
      {
        id: '2',
        description:
          'The scammer, PlayerLMN, lured the victim, GamerDEF, into a dangerous area and attacked, resulting in the loss of valuable items. The victim reported the incident to administrators.',
        amount: '600m',
        items: 'Abyssal whip, Dragon defender',
        scammerName: 'ScammerLMN',
        victimName: 'VictimDEF',
        evidence: 'https://www.streamable.com/another-denied-link',
        evidenceStrength: 'strong',
        status: 'Denied',
        scamType: 'Teleported out',
      },
      {
        id: '3',
        description:
          'PlayerABC reported a suspicious trade with PlayerXYZ. PlayerXYZ offered a valuable item but canceled the trade at the last moment, resulting in PlayerABC losing trust in trading with others.',
        amount: '150m',
        items: 'Twisted bow',
        scammerName: 'PlayerXYZ',
        victimName: 'PlayerABC',
        evidence: 'https://www.streamable.com/suspicious-trade-link',
        evidenceStrength: 'moderate',
        status: 'Denied',
        scamType: 'Trade scam',
      },
      {
        id: '4',
        description:
          'PlayerDEF encountered a player named Player123 who claimed to be giving away free items. PlayerDEF followed Player123 into a remote area and was attacked, losing their items.',
        amount: '300m',
        items: 'Dragon platebody, Dragon boots',
        scammerName: 'Player123',
        victimName: 'PlayerDEF',
        evidence: 'https://www.streamable.com/lured-into-danger-link',
        evidenceStrength: 'strong',
        status: 'Denied',
        scamType: 'Lured into danger',
      },
      {
        id: '5',
        description:
          'PlayerGHI traded their valuable item to PlayerJKL in exchange for promised in-game currency. However, PlayerJKL did not follow through with the trade, resulting in a loss for PlayerGHI.',
        amount: '200m',
        items: 'Twisted buckler',
        scammerName: 'PlayerJKL',
        victimName: 'PlayerGHI',
        evidence: 'https://www.streamable.com/false-trade-link',
        evidenceStrength: 'moderate',
        status: 'Denied',
        scamType: 'False trade',
      },
      {
        id: '6',
        description:
          'PlayerMNO received a message from PlayerXYZ claiming to be a game moderator. PlayerXYZ asked for PlayerMNO\'s account password for verification purposes. PlayerMNO reported the incident.',
        amount: '0',
        items: 'None',
        scammerName: 'PlayerXYZ',
        victimName: 'PlayerMNO',
        evidence: 'https://www.streamable.com/moderator-scam-link',
        evidenceStrength: 'strong',
        status: 'Denied',
        scamType: 'Impersonation',
      },
      {
        id: '7',
        description:
          'PlayerPQR was offered a rare item by PlayerXYZ at an unbelievably low price. PlayerPQR made the trade but received a different item from what was promised by PlayerXYZ.',
        amount: '50m',
        items: 'Elysian spirit shield',
        scammerName: 'PlayerXYZ',
        victimName: 'PlayerPQR',
        evidence: 'https://www.streamable.com/item-swap-scam-link',
        evidenceStrength: 'strong',
        status: 'Denied',
        scamType: 'Item swap',
      },
    ];

    const reversedDeniedTicketsData = [...deniedTicketsData].reverse();

    setDeniedTickets(reversedDeniedTicketsData);
    setFilteredTickets(reversedDeniedTicketsData);
  }, []);

  const handleChange = (ticketId, field, value) => {
    const updatedTickets = [...deniedTickets];
    const index = updatedTickets.findIndex((ticket) => ticket.id === ticketId);
    if (index !== -1) {
      updatedTickets[index][field] = value;
      setDeniedTickets(updatedTickets);
      setFilteredTickets(updatedTickets);
    }
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTickets(deniedTickets);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = deniedTickets.filter((ticket) => {
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
  }, [searchTerm, deniedTickets, tag]);

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
      case 'Denied':
        return '#f8d7da';
      default:
        return '';
    }
  };

  return (
    <div className="denied-tickets">
      <h2>Denied Tickets</h2>
      <div className='SearchContainer'>
      <input
          className='TicketSearch'
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      <p>Filters</p>
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
                <option value="Denied">Denied</option>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeniedTickets;
