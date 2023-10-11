import React, { useState, useEffect } from 'react'
import '../styles/Metrics.css'
import { getAllTickets } from '../server/ticketService'
import { ReactComponent as CheckmarkSVG } from '../assets/checkmark.svg'
import { ReactComponent as GoldSVG } from '../assets/gold.svg'
import { ReactComponent as TotalSVG } from '../assets/total.svg'
import { ReactComponent as FiledSVG } from '../assets/filed.svg'
import { ReactComponent as DeniedSVG } from '../assets/settingsX.svg'
import { ReactComponent as OpenSVG } from '../assets/investigate.svg'

function formatNumber (number) {
  return number.toLocaleString() + ' M'
}

function Metrics () {
  const [resolvedReports, setResolvedReports] = useState(0)
  const [totalGPRecovered, setTotalGPRecovered] = useState(0)
  const [totalSubmissions, setTotalSubmissions] = useState(0)
  const [totalScammerCount, setTotalScammerCount] = useState(0)
  const [newTickets, setNewTickets] = useState(0)
  const [openTickets, setOpenTickets] = useState(0)
  const [activeTickets, setActiveTickets] = useState(0)
  const [deniedTickets, setDeniedTickets] = useState(0)
  const [showMetrics, setShowMetrics] = useState(true)

  useEffect(() => {
    const tab = document.querySelector('.metrics-tab')
    const container = document.querySelector('.metrics-container')
    if (tab && container) {
      tab.addEventListener('mouseenter', () => {
        container.classList.add('hovered')
      })
      tab.addEventListener('mouseleave', () => {
        container.classList.remove('hovered')
      })
    }
  }, [])

  useEffect(() => {
    async function fetchMetricsData () {
      try {
        const tickets = await getAllTickets()
        const resolvedReportsCount = tickets.filter((ticket) => ticket.status === 'Resolved').length
        const totalRecovered = tickets.reduce((total, ticket) => total + parseFloat(ticket.debtRepaid), 0)
        const newTicketsCount = tickets.filter((ticket) => ticket.status === 'New').length
        const openTicketsCount = tickets.filter((ticket) => ticket.status === 'Open').length
        const activeTicketsCount = newTicketsCount + openTicketsCount
        const deniedTicketsCount = tickets.filter((ticket) => ticket.status === 'Denied').length
        const scammerCount = tickets.filter((ticket) => ticket.playerStatus === 'Scammer').length

        setNewTickets(newTicketsCount)
        setOpenTickets(openTicketsCount)
        setActiveTickets(activeTicketsCount)
        setDeniedTickets(deniedTicketsCount)
        setResolvedReports(resolvedReportsCount)
        setTotalGPRecovered(totalRecovered)
        setTotalSubmissions(tickets.length)
        setTotalScammerCount(scammerCount)
      } catch (error) {
        console.error('Error fetching metrics data:', error)
      }
    }

    fetchMetricsData()
  }, [])

  const isAdminPanel = window.location.pathname.startsWith('/admin')

  return (
    <section className={`metrics-container ${isAdminPanel ? 'admin-theme' : ''} ${!showMetrics ? 'hidden' : ''}`}>
        {isAdminPanel
          ? (
          <>
            {!isAdminPanel && (
            <div className="metrics-text">
              <p>
                Providing a transparent platform for the RuneScape community to report, track & retrieve stolen wealth.
              </p>
            </div>
            )}
            <div className={`metrics-tab ${showMetrics ? '' : 'hidden'}`} onClick={() => setShowMetrics(!showMetrics)}>
              <div className="tab-content">
                {showMetrics ? '←' : '≡'}
              </div>
            </div>
            <div className="metrics-items admin">
              <div className="metric admin">
                <div className="metric-content admin">
                  <div className="metric-icon admin">
                    <TotalSVG height="14px" width="14px" />
                  </div>
                  <div className="metric-text admin">New Tickets: </div>
                  <div className="metric-count admin">{newTickets.toLocaleString()}</div>
                </div>
              </div>

              <div className="metric admin">
                <div className="metric-content admin">
                  <div className="metric-icon admin">
                    <OpenSVG height="14px" width="14px" />
                  </div>
                  <div className="metric-text admin">Open Tickets: </div>
                  <div className="metric-count admin">{openTickets.toLocaleString()}</div>
                </div>
              </div>

              <div className="metric admin">
                <div className="metric-content admin">
                  <div className="metric-icon admin">
                    <FiledSVG height="14px" width="14px" />
                  </div>
                  <div className="metric-text admin">Active Tickets: </div>
                  <div className="metric-count admin">{activeTickets.toLocaleString()}</div>
                </div>
              </div>

              <div className="metric admin">
                <div className="metric-content admin">
                  <div className="metric-icon admin">
                    <CheckmarkSVG height="14px" width="14px" />
                  </div>
                  <div className="metric-text admin">Resolved Tickets: </div>
                  <div className="metric-count admin">{resolvedReports.toLocaleString()}</div>
                </div>
              </div>

              <div className="metric admin">
                <div className="metric-content admin">
                  <div className="metric-icon admin">
                    <DeniedSVG height="14px" width="14px" />
                  </div>
                  <div className="metric-text admin">Denied Tickets: </div>
                  <div className="metric-count admin">{deniedTickets.toLocaleString()}</div>
                </div>
              </div>

              <div className="metric admin">
                <div className="metric-content admin">
                  <div className="metric-icon admin">
                    <GoldSVG height="14px" width="14px" />
                  </div>
                  <div className="metric-text admin">Recovered: </div>
                  <div className="metric-count admin">{formatNumber(totalGPRecovered)}</div>
                </div>
              </div>

              <div className="metric admin">
                <div className="metric-content admin">
                  <div className="metric-text admin" style={{ color: 'red' }}>Scammers: </div>
                  <div className="metric-count admin">{totalScammerCount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </>
            )
          : (
            <>
            <div className="metrics-items">
                <div className="metric active-reports">
                  <div className="metric-icon">
                    <FiledSVG height="48px" width="48px" />
                  </div>
                  <div className="metric-number">{activeTickets.toLocaleString()}</div>
                  <div className="metric-label">Active Reports</div>
                </div>

                <div className="metric resolved-reports">
                  <div className="metric-icon">
                    <CheckmarkSVG height="48px" width="48px" />
                  </div>
                  <div className="metric-number">{resolvedReports.toLocaleString()}</div>
                  <div className="metric-label">Resolved Reports</div>
                </div>

                <div className="metric">
                  <div className="metric-icon">
                    <GoldSVG height="48px" width="48px" />
                  </div>
                  <div className="metric-number gp">{formatNumber(totalGPRecovered)}</div>
                  <div className="metric-label">Total GP Recovered</div>
                </div>

                <div className="metric total-submissions">
                <div className="metric-icon">
                  <TotalSVG height="48px" width="48px" />
                </div>
                  <div className="metric-number">{totalSubmissions.toLocaleString()}</div>
                  <div className="metric-label">Total Submissions</div>
                </div>
              </div>
            </>
            )}
    </section>
  )
}

export default Metrics
