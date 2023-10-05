import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
import Modal from './components/Modal';
import LoadingScreen from './components/LoadingScreen';
import StatsPage from './components/StatsPage';

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
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/stats" element={<StatsPage />} />
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
              // Handle report submission logic here
              setReportModalType('');
            }}
            modalType={reportModalType}
          />
          <Modal
            isOpen={signInModalType === 'SignIn'}
            onClose={() => setSignInModalType('')}
            title="Sign In"
            onSubmit={() => {
              // Handle sign-in logic here
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
