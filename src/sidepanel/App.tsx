// ============================================================
// MailPilot — Main Side Panel Component
// Full workspace: sidebar navigation + page content area.
// ============================================================

import React, { useState, useEffect } from 'react'
import {
  Mail,
  LayoutDashboard,
  Users,
  Trash2,
  Settings,
} from 'lucide-react'
import DashboardPage from './pages/DashboardPage'
import AccountsPage from './pages/AccountsPage'
import CleanupPage from './pages/CleanupPage'
import SettingsPage from './pages/SettingsPage'
import { pingBackground } from '../utils/messaging'
import type { SidePanelPage } from '../types'

// Navigation items configuration
const NAV_ITEMS: {
  id: SidePanelPage
  label: string
  icon: React.ReactNode
}[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
  { id: 'accounts',  label: 'Accounts',  icon: <Users size={15} /> },
  { id: 'cleanup',   label: 'Cleanup',   icon: <Trash2 size={15} /> },
  { id: 'settings',  label: 'Settings',  icon: <Settings size={15} /> },
]

const PAGE_META: Record<SidePanelPage, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard',       subtitle: 'Overview of your email health' },
  accounts:  { title: 'Accounts',        subtitle: 'Manage connected Gmail accounts' },
  cleanup:   { title: 'Email Cleanup',   subtitle: 'Find and remove unnecessary emails' },
  settings:  { title: 'Settings',        subtitle: 'Preferences and extension configuration' },
}

export default function SidePanelApp() {
  const [activePage, setActivePage] = useState<SidePanelPage>('dashboard')
  const [swStatus, setSwStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')

  // Verify background connection on mount
  useEffect(() => {
    async function checkSW() {
      const response = await pingBackground('sidepanel')
      setSwStatus(response ? 'connected' : 'disconnected')
    }
    checkSW()
  }, [])

  const meta = PAGE_META[activePage]

  return (
    <div className="sp-app">
      {/* ── Sidebar ── */}
      <aside className="sp-sidebar">
        {/* Logo */}
        <div className="sp-sidebar__logo">
          <div className="sp-sidebar__logo-icon">
            <Mail size={14} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <div className="sp-sidebar__app-name">MailPilot</div>
            <div className="sp-sidebar__app-version">v0.1.0 · Phase 1</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sp-sidebar__nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sp-nav-item${activePage === item.id ? ' active' : ''}`}
              onClick={() => setActivePage(item.id)}
            >
              {item.icon}
              <span className="sp-nav-item__label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="sp-sidebar__footer">
          <span className="sp-sidebar__footer-label">Phase 1 — Foundation</span>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <main className="sp-main">
        {/* Page header */}
        <div className="sp-page-header">
          <div>
            <div className="sp-page-title">{meta.title}</div>
            <div className="sp-page-subtitle">{meta.subtitle}</div>
          </div>
        </div>

        {/* Page content */}
        <div className="sp-page-content">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'accounts'  && <AccountsPage />}
          {activePage === 'cleanup'   && <CleanupPage />}
          {activePage === 'settings'  && <SettingsPage />}
        </div>

        {/* Service worker status bar */}
        <div className="sp-sw-bar">
          <div
            className="sp-sw-bar__dot"
            style={{
              backgroundColor:
                swStatus === 'connected' ? '#10B981' :
                swStatus === 'checking'  ? '#F59E0B' : '#EF4444',
            }}
          />
          <span>
            {swStatus === 'connected'    ? 'Service worker connected' :
             swStatus === 'checking'     ? 'Connecting…' :
             'Service worker unavailable'}
          </span>
        </div>
      </main>
    </div>
  )
}

