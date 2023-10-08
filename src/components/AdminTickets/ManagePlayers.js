import React, { useState, useEffect } from 'react';
import '../../styles/AdminTicket.css?v=1';
import { getAllTickets, updateTicketById } from '../../server/ticketService';

function ManagePlayers() {
  const [managePlayers, setManagePlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllTickets().then((players) => {
      const uniquePlayers = Array.from(
        new Map(players.map((player) => [player.scammerName, player])).values()
      );

      const sortedPlayers = uniquePlayers.sort((a, b) => {
        const statusOrder = {
          Scammer: 0,
          Victim: 1,
          'Serial Scammer': 2,
          Staff: 3,
          Authentic: 4,
          Streamer: 5,
        };

        if (statusOrder[a.status] < statusOrder[b.status]) {
          return -1;
        } else if (statusOrder[a.status] > statusOrder[b.status]) {
          return 1;
        } else {
          return b.id.localeCompare(a.id);
        }
      });

      setManagePlayers(sortedPlayers);
      setFilteredPlayers(sortedPlayers);
    });
  }, []);

  const handleChange = (playerId, field, value) => {
    const updatedPlayers = managePlayers.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          [field]: value,
        };
      }
      return player;
    });

    setManagePlayers(updatedPlayers);
  };

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPlayers(managePlayers);
    } else {
      const searchTermLower = searchTerm.toLowerCase();
      const filtered = managePlayers.filter((player) => {
        let searchField = '';
        searchField = `${player.id} ${player.scammerName.toLowerCase()} ${player.victimName.toLowerCase()} ${player.amount}`;

        return searchField.includes(searchTermLower);
      });
      setFilteredPlayers(filtered);
    }
  }, [searchTerm, managePlayers]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scammer':
        return '#ab0505';
      case 'Victim':
        return '#28a745';
      case 'Serial Scammer':
        return '#da0d0d';
      case 'Staff':
        return '#0db3cc';
      case 'Authentic':
        return '#28a745';
      case 'Streamer':
        return '#8a00fc';
      default:
        return '';
    }
  };

  const calculateTotalAmount = (playerName) => {
    return managePlayers
      .filter((player) => player.scammerName === playerName)
      .reduce((total, player) => {
        return total + parseFloat(player.amount);
      }, 0);
  };

  const getPlayerPreviousNames = (playerName) => {
    const previousNames = new Set();
    managePlayers.forEach((player) => {
      if (player.scammerName === playerName && player.previousNames) {
        player.previousNames.split(',').forEach((name) => {
          previousNames.add(name.trim());
        });
      }
    });
    return Array.from(previousNames);
  };

  const handleSave = (playerId) => {
    const playerToUpdate = managePlayers.find((player) => player.id === playerId);

    if (playerToUpdate) {

      delete playerToUpdate.evidenceStrength;

      updateTicketById(playerId, playerToUpdate)
        .then((updatedPlayer) => {
          if (updatedPlayer) {
            console.log(`Player ${playerId} saved successfully.`);
          } else {
            console.error(`Player ${playerId} not found.`);
          }
        })
        .catch((error) => {
          console.error(`Error saving player ${playerId}: ${error.message}`);
        });
    }
  };

  return (
    <div className="manage-players">
      <h2>Manage Players</h2>
      <div className="SearchContainer">
        <input
          className="TicketSearch"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="card-container">
        {filteredPlayers.map((player) => (
          <div
            key={player.id}
            className={`ticket-card ${getStatusColor(player.status)}`}
          >
            <div className="card-header">
              <span>Scammer Name: {player.scammerName}</span>
              <select
                value={player.status}
                onChange={(e) => handleChange(player.id, 'status', e.target.value)}
              >
                <option value="Scammer">Scammer</option>
                <option value="Victim">Victim</option>
                <option value="Serial Scammer">Serial Scammer</option>
                <option value="Staff">Staff</option>
                <option value="Authentic">Authentic</option>
                <option value="Streamer">Streamer</option>
              </select>
            </div>
            <div className="card-body">
              <div className="field">
                <label>Previous Names</label>
                <span>{getPlayerPreviousNames(player.scammerName).join(', ')}</span>
              </div>
              <div className="field">
                <label>
                  {player.status === 'Victim' ? 'Total Wealth Stolen' : 'Total Amount Scammed'}
                </label>
                <span>
                  {player.status === 'Victim'
                    ? `${calculateTotalAmount(player.scammerName)}m`
                    : `${calculateTotalAmount(player.scammerName)}m`}
                </span>
              </div>
              <button onClick={() => handleSave(player.id)} className="save-button">
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagePlayers;