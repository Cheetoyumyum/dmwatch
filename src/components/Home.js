import React from 'react';
import Header from './Header';
import Metrics from './Metrics';
import SearchBar from './SearchBar';
import Cases from './Cases';
import Modal from './Modal';
import Ticker from './Ticker';
import LoadingScreen from './LoadingScreen';

function Home() {
  return (
    <div className="Home">
      <Metrics />
      <SearchBar onLoadPlayerFile={() => {}} />
      <Ticker />
    </div>
  );
}

export default Home;
