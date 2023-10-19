import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingScreen from './LoadingScreen'
import { getPlayerByName } from '../server/ticketService'
import '../styles/Players.css?v=1'
import Error404 from './Error404'
import { ReactComponent as ChangeIconSVG } from '../assets/nameChange.svg'

function Players () {
  const { player } = useParams()
  const [playerData, setPlayerData] = useState({})
  // Needs implentation/Design, wether from DMWatch or osrs api
  // eslint-disable-next-line no-unused-vars
  const [highscores, setHighscores] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeTab, setActiveTab] = useState('Overview')
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData () {
      try {
        const playerInfo = await getPlayerByName(player)
        if (playerInfo) {
          setPlayerData(playerInfo)
          setLoading(false)
        } else {
          setNotFound(true)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }
    async function fetchHighscoresData () {

    }

    fetchData()
    fetchHighscoresData()
  }, [player])

  const handleCaseClick = (caseId) => {
    navigate(`/cases/${caseId}`)
  }

  const handleBack = () => {
    navigate(-1)
  }

  function formatDate (dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  const tabOptions = ['Overview', 'Cases', 'Vouches']

  if (loading) {
    return <LoadingScreen />
  }

  if (notFound) {
    return <Error404 />
  }

  // For live demo, use code to fetch data from PlayerVouches
  const vouches = [
    {
      giver: 'Player1',
      amount: '10000m',
      comment: 'Trusted, didnt scam',
      vouchTime: '2023-10-01T14:30:00Z'
    },
    {
      giver: 'Player2',
      amount: '50000m',
      comment: 'Held 50B pot',
      vouchTime: '2023-10-02T12:15:00Z'
    }
  ]

  const totalCases = playerData.cases ? playerData.cases.length : 0
  const totalTimesVictim = playerData.cases ? playerData.cases.filter(item => item.victimName === player).length : 0
  const totalTimesScammed = playerData.cases ? playerData.cases.filter(item => item.scammerName === player).length : 0
  const gpStolen = playerData.cases
    ? playerData.cases
      .filter(item => item.scammerName === player)
      .reduce((total, item) => total + parseFloat(item.amount), 0)
    : 0
  const gpRepaid = playerData.cases
    ? playerData.cases
      .filter(item => item.scammerName === player)
      .reduce((total, item) => total + parseFloat(item.debtRepaid), 0)
    : 0

  return (
    <div className="players-container">
      <div className="player-card">
        <h1>{playerData.scammerName}</h1>
      </div>

      <div className="nav-bar">
        {tabOptions.map((tab, index) => (
          <button
            key={index}
            className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Overview' && (
        <div className='Overview'>
          <div className='playerInfo'>
            <h2 className="playerTitle">Overview</h2>
            <p><strong>Status</strong><br/> {playerData.status}</p>
            <p><strong>Last Updated at</strong><br/> {formatDate(playerData.lastUpdatedAt)}</p>
            <p><strong>Last Changed at</strong><br/>{formatDate(playerData.lastChangedAt)}</p>
          </div>

          <div className="playerNames">
            <h2 className="playerTitle">Name Change History</h2>
            <p>
             {playerData.previousNames[playerData.previousNames.length - 1]} <ChangeIconSVG /> {playerData.scammerName}
            </p>
            {playerData.previousNames
              .map((name, index) => index > 0 ? [name, playerData.previousNames[index - 1]] : null)
              .filter(Boolean)
              .reverse()
              .map(([name1, name2], index) => (
                <p key={index}>
                  {name1} <ChangeIconSVG /> {name2}
                </p>
              ))}
          </div>

          <div className="playerData">
              <h2 className="playerTitle">Metrics</h2>
              <p><strong>Total Cases</strong><br/> {totalCases}</p>
              <p><strong>Total Times Victim</strong><br/> {totalTimesVictim}</p>
              <p><strong>Total Times Scammed</strong><br/> {totalTimesScammed}</p>
              <p><strong>GP Stolen</strong><br/> {gpStolen}m</p>
              <p><strong>GP Repaid</strong><br/> {gpRepaid}m</p>
          </div>
        </div>
      )}

      {activeTab === 'Cases' && (
        <div>
          <div className="case-cards">
            {playerData.cases.map((caseItem) => (
              <div key={caseItem.id} className="case-card" onClick={() => handleCaseClick(caseItem.id)}>
                <h3>
                  <strong>Case&nbsp;</strong> {caseItem.id}
                </h3>
                <p><strong>Description</strong><br/> {caseItem.description}</p>
                <p><strong>Amount</strong><br/> {caseItem.amount}</p>
                <p><strong>Victim Name</strong><br/> {caseItem.victimName}</p>
                <small style={{ color: '#788197' }}>Case id: </small>
                <small style={{ color: '#788197' }}>{caseItem.id}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'Vouches' && (
        <div>
          <div className="case-cards">
            {vouches.map((vouch, index) => (
              <div key={index} className="case-card">
                <h3>
                  <strong>Vouch&nbsp;</strong> {index + 1}
                </h3>
                <p>
                  <strong>Giver</strong>
                  <br /> {vouch.giver}
                </p>
                <p>
                  <strong>Amount</strong>
                  <br /> {vouch.amount}
                </p>
                <p>
                  <strong>Vouch Time</strong>
                  <br /> {formatDate(vouch.vouchTime)}
                </p>
                <p>
                  <br /> {vouch.comment}
                </p>

              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleBack} className="nav-button">
        Back
      </button>
    </div>
  )
}

export default Players
