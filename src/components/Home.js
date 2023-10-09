import React from 'react'
import Metrics from './Metrics'
import SearchBar from './SearchBar'
import Ticker from './Ticker'

function Home () {
  return (
    <div className="Home">
      <Metrics />
      <SearchBar onLoadPlayerFile={() => {}} />
      <Ticker />
    </div>
  )
}

export default Home
