import ticketsData from './tickets.json';


async function getAllTickets() {
  try {
    const tickets = ticketsData;
    return tickets;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
}

async function createTicket(newTicket) {
  try {
    return newTicket;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
}

async function updateTicketById(id, updatedTicket) {
  try {
    return updatedTicket;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
}

async function deleteTicketById(id) {
  try {
    return `Ticket ${id} deleted successfully`;
  } catch (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
}

export { getAllTickets, createTicket, updateTicketById, deleteTicketById };
