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

  const tabOptions = ['Overview', 'Cases']

  if (loading) {
    return <LoadingScreen />
  }

  if (notFound) {
    return <Error404 />
  }

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
        <h1><strong>RSN:</strong> {playerData.scammerName}</h1>
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
            <p><strong>Status:</strong> {playerData.status}</p>
            <p><strong>Last Updated at:</strong> {formatDate(playerData.lastUpdatedAt)}</p>
            <p><strong>Last Changed at:</strong> {formatDate(playerData.lastChangedAt)}</p>
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
              <p><strong>Total Cases:</strong> {totalCases}</p>
              <p><strong>Total Times Victim:</strong> {totalTimesVictim}</p>
              <p><strong>Total Times Scammed:</strong> {totalTimesScammed}</p>
              <p><strong>GP Stolen:</strong> {gpStolen}m</p>
              <p><strong>GP Repaid:</strong> {gpRepaid}m</p>
          </div>
        </div>
      )}

      {activeTab === 'OSRS Highscores' && (
        <div>
          <h2 className="caseTitle">OSRS Highscores</h2>
          {Array.isArray(highscores) && highscores.length > 0
            ? (
              <table>
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Experience</th>
                  <th>Level</th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody>
                {highscores.map((/* skill */) => (
                  <tr key='skill' /* key={ skill.skill } */>
                    <td>{/* skill.skill */}</td>
                    <td>{/* skill.experience */}</td>
                    <td>{/* skill.level */}</td>
                    <td>{/* skill.rank */}</td>
                  </tr>
                ))}
              </tbody>
            </table>
              )
            : (
            <p>No highscores data available.</p>
              )}
        </div>
      )}

      {activeTab === 'Cases' && (
        <div>
          <div className="case-cards">
            {playerData.cases.map((caseItem) => (
              <div key={caseItem.id} className="case-card" onClick={() => handleCaseClick(caseItem.id)}>
                <h3>
                  <strong>Case:&nbsp;</strong> {caseItem.id}
                </h3>
                <div className={`evidence-meter ${caseItem.evidenceStrength}`}>
                  <div className="evidence-bar">
                    <div className="evidence-bar-fill"></div>
                  </div>
                </div>
                <p><strong>Description:</strong> {caseItem.description}</p>
                <p><strong>Amount:</strong> {caseItem.amount}</p>
                <p><strong>Victim Name:</strong> {caseItem.victimName}</p>
                <small>Case id: </small>
                <small style={{ color: 'gray' }}>{caseItem.id}</small>
              </div>
            ))}
          </div>
        </div>
      )}

      <button onClick={handleBack} className="back-link">
        Back
      </button>
    </div>
  )
}

export default Players
