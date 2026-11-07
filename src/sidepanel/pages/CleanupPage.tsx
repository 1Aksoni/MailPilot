// ============================================================
// Cleanup Page — Side Panel
// ============================================================

import React from 'react'
import { Trash2, Mail, Paperclip, Zap, AlertCircle } from 'lucide-react'
import { MOCK_CLEANUP_STATS } from '../../shared/mockData'

interface CleanupItemProps {
  icon: React.ReactNode
  iconBg: string
  title: string
  subtitle: string
  count: number | string
}

function CleanupItem({ icon, iconBg, title, subtitle, count }: CleanupItemProps) {
  return (
    <div className="sp-cleanup-item">
      <div className="sp-cleanup-item__icon" style={{ background: iconBg }}>
        {icon}
      </div>
      <div className="sp-cleanup-item__body">
        <div className="sp-cleanup-item__title">{title}</div>
        <div className="sp-cleanup-item__subtitle">{subtitle}</div>
      </div>
      <div className="sp-cleanup-item__count">
        {typeof count === 'number' ? count.toLocaleString() : count}
      </div>
    </div>
  )
}

export default function CleanupPage() {
  return (
    <div>
      <div className="sp-demo-banner">
        <AlertCircle size={14} color="#D97706" />
        <span>Cleanup actions are <strong>disabled in demo mode</strong>. Connect Gmail in Phase 2 to enable.</span>
      </div>

      <div className="sp-cleanup-list">
        <CleanupItem
          icon={<Trash2 size={18} color="#EF4444" />}
          iconBg="#FEF2F2"
          title="Promotional Emails"
          subtitle="Newsletters, marketing, and subscription emails"
          count={MOCK_CLEANUP_STATS.promotionalEmails}
        />
        <CleanupItem
          icon={<Mail size={18} color="#F59E0B" />}
          iconBg="#FFFBEB"
          title="Old Unread Emails"
          subtitle="Unread emails older than 30 days"
          count={MOCK_CLEANUP_STATS.unreadOlderThan30Days}
        />
        <CleanupItem
          icon={<Paperclip size={18} color="#8B5CF6" />}
          iconBg="#F5F3FF"
          title="Large Attachments"
          subtitle="Emails with attachments larger than 5 MB"
          count={MOCK_CLEANUP_STATS.largeAttachments}
        />
        <CleanupItem
          icon={<Zap size={18} color="#10B981" />}
          iconBg="#ECFDF5"
          title="Potential Storage Savings"
          subtitle="Estimated space recoverable by cleaning up"
          count={`${(MOCK_CLEANUP_STATS.potentialSavingsMB / 1024).toFixed(1)} GB`}
        />
      </div>
    </div>
  )
}

