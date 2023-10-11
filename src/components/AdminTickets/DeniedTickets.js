import React, { useState, useEffect } from 'react'
import '../../styles/AdminTicket.css?v=1'
import { getAllTickets, updateTicketById } from '../../server/ticketService'
import ItemSelectionPopup from '../ItemSelectionPopup'
import Metrics from '../Metrics'

function DeniedTickets () {
  const [deniedTickets, setDeniedTickets] = useState([])
  const [filteredTickets, setFilteredTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [tag, setTag] = useState('')
  const [isItemPopupOpen, setIsItemPopupOpen] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [selectedItems, setSelectedItems] = useState([])
  const [staffComment, setStaffComment] = useState('')

  useEffect(() => {
    getAllTickets()
      .then((tickets) => {
        const filteredDeniedTickets = tickets
          .filter((ticket) => ticket.status === 'Denied')
          .sort((a, b) => b.id - a.id)

        setDeniedTickets(filteredDeniedTickets)
        setFilteredTickets(filteredDeniedTickets)
      })
      .catch((error) => {
        console.error('Error fetching tickets:', error)
      })
  }, [])

  const handleChange = (ticketId, field, value) => {
    const updatedTickets = deniedTickets.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, [field]: value }
      }
      return ticket
    })

    setDeniedTickets(updatedTickets)
  }

  const handleSave = (ticketId) => {
    const ticketToUpdate = deniedTickets.find((ticket) => ticket.id === ticketId)

    if (ticketToUpdate) {
      updateTicketById(ticketId, ticketToUpdate)
        .then((updatedTicket) => {
          if (updatedTicket) {
            console.log(`Ticket ${ticketId} saved successfully.`)
          } else {
            console.error(`Ticket ${ticketId} not found.`)
          }
        })
        .catch((error) => {
          console.error(`Error saving ticket ${ticketId}: ${error.message}`)
        })
    }
  }

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTickets(deniedTickets)
    } else {
      const searchTermLower = searchTerm.toLowerCase()
      const filtered = deniedTickets.filter((ticket) => {
        let searchField = ''
        if (tag === 'id:') {
          searchField = ticket.id
        } else if (tag === 'rsn:') {
          searchField = `${ticket.scammerName.toLowerCase()} ${ticket.victimName.toLowerCase()}`
        } else {
          searchField = `${ticket.id} ${ticket.scammerName.toLowerCase()} ${ticket.victimName.toLowerCase()} ${ticket.amount}`
        }

        return searchField.includes(searchTermLower)
      })
      setFilteredTickets(filtered)
    }
  }, [searchTerm, deniedTickets, tag])

  const toggleTag = (selectedTag) => {
    setTag(tag === selectedTag ? '' : selectedTag)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return '#ab9d05'
      case 'Resolved':
        return '#16ab05'
      case 'New':
        return '#0587ab'
      case 'Denied':
        return '#ab0505'
      default:
        return ''
    }
  }

  const handleOpenItemPopup = () => {
    setIsItemPopupOpen(true)
  }

  const handleCloseItemPopup = () => {
    setIsItemPopupOpen(false)
  }

  return (
    <div className="denied-tickets">
      <Metrics />
      <h2>Denied Tickets</h2>
      <div className="SearchContainer">
        <input
          className="TicketSearch"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className={`admin-btn ${tag === 'id:' ? 'active' : ''}`}
          onClick={() => toggleTag('id:')}
        >
          id
        </button>
        <button
          className={`admin-btn ${tag === 'rsn:' ? 'active' : ''}`}
          onClick={() => toggleTag('rsn:')}
        >
          rsn
        </button>
      </div>
      <div className="card-container">
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="ticket-card"
            style={{ borderColor: getStatusColor(ticket.status) }}
          >
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
                <button disabled onClick={handleOpenItemPopup}>Select Items (Broken rightnow)</button>
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
                  value={ticket.debtRepaid}
                  onChange={(e) => handleChange(ticket.id, 'debtRepaid', e.target.value)}
                />
              </div>
              <div className="field">
                <label>Staff Comments</label>
                <textarea
                  value={staffComment}
                  onChange={(e) => setStaffComment(e.target.value)}
                  rows="5"
                />
              </div>
              <button
                onClick={() => handleSave(ticket.id)}
                className="admin-btn"
              >
                Save
              </button>
            </div>
          </div>
        ))}
      </div>
      {isItemPopupOpen && (
        <ItemSelectionPopup
          isOpen={isItemPopupOpen}
          onClose={handleCloseItemPopup}
          onSelectItems={(items) => setSelectedItems(items)}
        />
      )}
    </div>
  )
}

export default DeniedTickets
