// ============================================================
// MailPilot — Main Popup Component
// Opens when user clicks the extension icon in Chrome toolbar.
// ============================================================

import { useState, useEffect } from 'react'
import {
  Mail,
  LayoutDashboard,
  Trash2,
  Settings,
  ChevronRight,
  Zap,
  ShieldCheck,
} from 'lucide-react'
import AccountCard from './components/AccountCard'
import StatusBadge from './components/StatusBadge'
import { MOCK_ACCOUNTS, MOCK_CLEANUP_STATS } from '../shared/mockData'
import { pingBackground } from '../utils/messaging'
import type { PongMessage } from '../types'

export default function Popup() {
  const [swStatus, setSwStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [swMessage, setSwMessage] = useState<string>('')

  // Ping the background service worker on mount to verify connection
  useEffect(() => {
    async function checkConnection() {
      const response: PongMessage | null = await pingBackground('popup')
      if (response) {
        setSwStatus('connected')
        setSwMessage(response.message)
      } else {
        setSwStatus('disconnected')
        setSwMessage('Service worker unavailable')
      }
    }
    checkConnection()
  }, [])

  // Open the side panel using Chrome Side Panel API
  // Must be triggered by a user gesture (button click)
  function handleOpenSidePanel() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (tabId !== undefined) {
        chrome.sidePanel.open({ tabId })
      }
    })
    // Close the popup — Chrome can't show popup + side panel simultaneously
    window.close()
  }

  function handleOpenSettings() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id
      if (tabId !== undefined) {
        chrome.sidePanel.open({ tabId })
      }
    })
    window.close()
  }

  return (
    <div className="popup">
      {/* ── Header ── */}
      <header className="popup__header">
        <div className="popup__logo">
          <div className="popup__logo-icon">
            <Mail size={16} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="popup__title">MailPilot</h1>
            <p className="popup__subtitle">Privacy-first email manager</p>
          </div>
        </div>
        <button
          className="popup__settings-btn"
          onClick={handleOpenSettings}
          title="Open Settings"
        >
          <Settings size={16} color="#64748B" />
        </button>
      </header>

      {/* ── Service Worker Status ── */}
      <div className="popup__status-bar">
        <StatusBadge status={swStatus} message={swStatus === 'connected' ? undefined : swMessage} />
        {swStatus === 'connected' && (
          <span className="popup__status-msg">{swMessage}</span>
        )}
      </div>

      {/* ── Demo Notice ── */}
      <div className="popup__demo-notice">
        <ShieldCheck size={12} color="#F59E0B" />
        <span>Demo mode — no real accounts connected</span>
      </div>

      {/* ── Accounts Section ── */}
      <section className="popup__section">
        <div className="popup__section-header">
          <span className="popup__section-title">Connected Accounts</span>
          <span className="popup__section-count">{MOCK_ACCOUNTS.length}</span>
        </div>
        <div className="popup__accounts">
          {MOCK_ACCOUNTS.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </section>

      {/* ── Cleanup Overview ── */}
      <section className="popup__section">
        <div className="popup__section-header">
          <span className="popup__section-title">Cleanup Overview</span>
          <Zap size={13} color="#F59E0B" />
        </div>
        <div className="popup__stats-grid">
          <div className="popup__stat">
            <Trash2 size={14} color="#EF4444" />
            <div>
              <span className="popup__stat-value">
                {MOCK_CLEANUP_STATS.promotionalEmails.toLocaleString()}
              </span>
              <span className="popup__stat-label">Promotional</span>
            </div>
          </div>
          <div className="popup__stat">
            <Mail size={14} color="#F59E0B" />
            <div>
              <span className="popup__stat-value">
                {MOCK_CLEANUP_STATS.unreadOlderThan30Days.toLocaleString()}
              </span>
              <span className="popup__stat-label">Old unread</span>
            </div>
          </div>
          <div className="popup__stat">
            <LayoutDashboard size={14} color="#8B5CF6" />
            <div>
              <span className="popup__stat-value">
                {MOCK_CLEANUP_STATS.largeAttachments}
              </span>
              <span className="popup__stat-label">Large files</span>
            </div>
          </div>
          <div className="popup__stat">
            <Zap size={14} color="#10B981" />
            <div>
              <span className="popup__stat-value">
                {(MOCK_CLEANUP_STATS.potentialSavingsMB / 1024).toFixed(1)} GB
              </span>
              <span className="popup__stat-label">Can save</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Open Workspace Button ── */}
      <div className="popup__footer">
        <button className="popup__open-btn" onClick={handleOpenSidePanel}>
          <LayoutDashboard size={15} />
          <span>Open Full Workspace</span>
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  )
}
