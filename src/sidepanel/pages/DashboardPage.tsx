// ============================================================
// Dashboard Page — Side Panel
// ============================================================

import React from 'react'
import { Mail, Trash2, Zap, Users, TrendingUp, AlertCircle } from 'lucide-react'
import { MOCK_ACCOUNTS, MOCK_CLEANUP_STATS, formatStorage } from '../../shared/mockData'

export default function DashboardPage() {
  const totalEmails = MOCK_ACCOUNTS.reduce((sum, a) => sum + a.totalEmails, 0)
  const totalUnread = MOCK_ACCOUNTS.reduce((sum, a) => sum + a.unreadCount, 0)
  const totalStorageMB = MOCK_ACCOUNTS.reduce((sum, a) => sum + a.storageUsedMB, 0)
  const cleanupTotal =
    MOCK_CLEANUP_STATS.promotionalEmails + MOCK_CLEANUP_STATS.unreadOlderThan30Days

  return (
    <div>
      {/* Demo banner */}
      <div className="sp-demo-banner">
        <AlertCircle size={14} color="#D97706" />
        <span>
          <strong>Demo mode</strong> — all data is simulated. No real Gmail accounts connected.
        </span>
      </div>

      {/* Stat cards */}
      <div className="sp-stats-row">
        <div className="sp-stat-card">
          <div className="sp-stat-card__icon">
            <Users size={18} color="#3B82F6" />
          </div>
          <div className="sp-stat-card__value">{MOCK_ACCOUNTS.length}</div>
          <div className="sp-stat-card__label">Connected accounts</div>
        </div>

        <div className="sp-stat-card">
          <div className="sp-stat-card__icon">
            <Mail size={18} color="#8B5CF6" />
          </div>
          <div className="sp-stat-card__value">{totalUnread.toLocaleString()}</div>
          <div className="sp-stat-card__label">Total unread</div>
        </div>

        <div className="sp-stat-card">
          <div className="sp-stat-card__icon">
            <Trash2 size={18} color="#EF4444" />
          </div>
          <div className="sp-stat-card__value">{cleanupTotal.toLocaleString()}</div>
          <div className="sp-stat-card__label">Cleanup candidates</div>
        </div>

        <div className="sp-stat-card">
          <div className="sp-stat-card__icon">
            <Zap size={18} color="#10B981" />
          </div>
          <div className="sp-stat-card__value">
            {(MOCK_CLEANUP_STATS.potentialSavingsMB / 1024).toFixed(1)} GB
          </div>
          <div className="sp-stat-card__label">Potential savings</div>
        </div>
      </div>

      {/* Overview card */}
      <div className="sp-card">
        <div className="sp-card__title">Email Overview</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <OverviewRow
            icon={<Mail size={14} color="#3B82F6" />}
            label="Total emails across accounts"
            value={totalEmails.toLocaleString()}
          />
          <OverviewRow
            icon={<TrendingUp size={14} color="#8B5CF6" />}
            label="Storage used"
            value={formatStorage(totalStorageMB)}
          />
          <OverviewRow
            icon={<Trash2 size={14} color="#EF4444" />}
            label="Promotional emails"
            value={MOCK_CLEANUP_STATS.promotionalEmails.toLocaleString()}
          />
          <OverviewRow
            icon={<AlertCircle size={14} color="#F59E0B" />}
            label="Unread older than 30 days"
            value={MOCK_CLEANUP_STATS.unreadOlderThan30Days.toLocaleString()}
          />
          <OverviewRow
            icon={<Zap size={14} color="#8B5CF6" />}
            label="Emails with large attachments"
            value={MOCK_CLEANUP_STATS.largeAttachments.toString()}
          />
        </div>
      </div>
    </div>
  )
}

function OverviewRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        padding: '8px 10px',
        background: '#F8FAFC',
        borderRadius: '8px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon}
        <span style={{ fontSize: '12px', color: '#475569' }}>{label}</span>
      </div>
      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{value}</span>
    </div>
  )
}

