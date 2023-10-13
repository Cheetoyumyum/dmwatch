import ticketsData from './tickets.json'

function filterTicketsByStatus (status) {
  return ticketsData.filter((ticket) => ticket.status === status)
}

function filterTicketsByPlayerName (playerName) {
  return ticketsData.filter(
    (ticket) => ticket.scammerName === playerName || ticket.victimName === playerName
  )
}

async function fetchLatestCases () {
  try {
    const latestOpenCases = filterTicketsByStatus('Open')
      .sort((a, b) => b.id - a.id)
      .slice(0, 6)

    if (latestOpenCases.length < 6) {
      const newCases = filterTicketsByStatus('New')
        .sort((a, b) => b.id - a.id)
        .slice(0, 6 - latestOpenCases.length)

      return [...latestOpenCases, ...newCases]
    }

    return latestOpenCases
  } catch (error) {
    console.error('Error fetching latest cases:', error)
    throw error
  }
}

async function fetchLatestResolvedCases () {
  try {
    const latestResolvedCases = filterTicketsByStatus('Resolved')
      .sort((a, b) => b.id - a.id)
      .slice(0, 6)

    return latestResolvedCases
  } catch (error) {
    console.error('Error fetching latest resolved cases:', error)
    throw error
  }
}

async function getAllTickets () {
  try {
    const tickets = ticketsData
    return tickets
  } catch (error) {
    console.error('Error fetching tickets:', error)
    throw error
  }
}

async function createTicket (newTicket) {
  try {
    return newTicket
  } catch (error) {
    console.error('Error creating ticket:', error)
    throw error
  }
}

async function updateTicketById (id, updatedTicket) {
  try {
    return updatedTicket
  } catch (error) {
    console.error('Error updating ticket:', error)
    throw error
  }
}

async function deleteTicketById (id) {
  try {
    return `Ticket ${id} deleted successfully`
  } catch (error) {
    console.error('Error deleting ticket:', error)
    throw error
  }
}

async function getPlayerByName (playerName) {
  try {
    const playerCases = filterTicketsByPlayerName(playerName)
    if (playerCases.length > 0) {
      const previousNames = playerCases[0].previousNames
        ? playerCases[0].previousNames.split(', ')
        : []
      return {
        cases: playerCases,
        scammerName: playerCases[0].scammerName,
        status: playerCases[0].status,
        previousNames
      }
    }
    return null
  } catch (error) {
    console.error('Error fetching player data by name:', error)
    throw error
  }
}

export {
  getAllTickets,
  createTicket,
  updateTicketById,
  deleteTicketById,
  fetchLatestCases,
  fetchLatestResolvedCases,
  getPlayerByName
}
