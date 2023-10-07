import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
import Modal from './components/Modal';
import Cases from './components/Cases';
import Players from './components/Players';
import LoadingScreen from './components/LoadingScreen';
import StatsPage from './components/StatsPage';
import ManageTickets from './components/AdminTickets/ManageTickets';
import ResolvedTickets from './components/AdminTickets/ResolvedTickets';
import DeniedTickets from './components/AdminTickets/DeniedTickets';
import ManagePlayers from './components/AdminTickets/ManagePlayers';

function App() {
  const [loadingPlayerFile, setLoadingPlayerFile] = useState(false);
  const [reportModalType, setReportModalType] = useState('');
  const [signInModalType, setSignInModalType] = useState('');

  return (
    <Router>
      <Header
        onOpenReportModal={() => setReportModalType('Submit')}
        onOpenSignInModal={() => setSignInModalType('SignIn')}
        modalType={''}
      />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="player/:player" element={<Players />} />
        <Route path="cases/:id" element={<Cases />}/>
        <Route path="admin/manage-tickets" element={<ManageTickets />} />
        <Route path="admin/resolved-tickets" element={<ResolvedTickets />} />
        <Route path="admin/denied-tickets" element={<DeniedTickets />} />
        <Route path="admin/manage-players" element={<ManagePlayers />} />
      </Routes>
      {loadingPlayerFile ? (
        <LoadingScreen />
      ) : (
        <>
          <Modal
            isOpen={reportModalType === 'Submit'}
            onClose={() => setReportModalType('')}
            title="Report a Scammer"
            onSubmit={() => {
              setReportModalType('');
            }}
            modalType={reportModalType}
          />
          <Modal
            isOpen={signInModalType === 'SignIn'}
            onClose={() => setSignInModalType('')}
            title="Sign In"
            onSubmit={() => {
              setSignInModalType('');
            }}
            modalType={signInModalType}
          />
        </>
      )}
    </Router>
  );
}

export default App;
