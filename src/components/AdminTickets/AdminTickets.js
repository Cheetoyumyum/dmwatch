import React, { useState } from 'react';
import ManageTickets from './ManageTickets';
import ResolvedTickets from './ResolvedTickets';
import DeniedTickets from './DeniedTickets';
import '../../styles/AdminTicket.css?v=1'; 

function AdminTickets() {
  const [activeView, setActiveView] = useState('manage');

  const handleViewChange = (view) => {
    setActiveView(view);
  };

  return (
    <div className="admin-tickets-container">
      <h1>Admin Tickets</h1>
      <div className="admin-tickets-menu">
        <button
          className={activeView === 'manage' ? 'active' : ''}
          onClick={() => handleViewChange('manage')}
        >
          Manage Tickets
        </button>
        <button
          className={activeView === 'resolved' ? 'active' : ''}
          onClick={() => handleViewChange('resolved')}
        >
          Resolved Tickets
        </button>
        <button
          className={activeView === 'denied' ? 'active' : ''}
          onClick={() => handleViewChange('denied')}
        >
          Denied Tickets
        </button>
      </div>
      <div className="admin-tickets-view">
        {activeView === 'manage' && <ManageTickets />}
        {activeView === 'resolved' && <ResolvedTickets />}
        {activeView === 'denied' && <DeniedTickets />}
      </div>
    </div>
  );
}

export default AdminTickets;
