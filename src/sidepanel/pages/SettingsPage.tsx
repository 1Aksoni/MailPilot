// ============================================================
// Settings Page — Side Panel
// ============================================================

import React from 'react'
import {
  ShieldCheck,
  Bell,
  Moon,
  Info,
  Lock,
  Globe,
  HardDrive,
} from 'lucide-react'

interface SettingsRowProps {
  icon: React.ReactNode
  label: string
  description: string
  value?: string
}

function SettingsRow({ icon, label, description, value }: SettingsRowProps) {
  return (
    <div className="sp-settings-row">
      <div className="sp-settings-row__icon">{icon}</div>
      <div className="sp-settings-row__body">
        <div className="sp-settings-row__label">{label}</div>
        <div className="sp-settings-row__desc">{description}</div>
      </div>
      {value && <div className="sp-settings-row__value">{value}</div>}
    </div>
  )
}

export default function SettingsPage() {
  return (
    <div>
      {/* Privacy */}
      <div className="sp-settings-group">
        <div className="sp-settings-group__title">Privacy</div>
        <SettingsRow
          icon={<ShieldCheck size={16} color="#10B981" />}
          label="Local Processing"
          description="Email data is processed on your device only"
          value="Enabled"
        />
        <SettingsRow
          icon={<Lock size={16} color="#3B82F6" />}
          label="Data Storage"
          description="Settings stored in Chrome local storage"
          value="Local only"
        />
        <SettingsRow
          icon={<Globe size={16} color="#64748B" />}
          label="Network Access"
          description="No external servers or cloud sync in Phase 1"
          value="Disabled"
        />
      </div>

      {/* Preferences */}
      <div className="sp-settings-group">
        <div className="sp-settings-group__title">Preferences</div>
        <SettingsRow
          icon={<Bell size={16} color="#F59E0B" />}
          label="Notifications"
          description="Cleanup and unread email alerts"
          value="Phase 2"
        />
        <SettingsRow
          icon={<Moon size={16} color="#8B5CF6" />}
          label="Dark Mode"
          description="Toggle light and dark appearance"
          value="Phase 2"
        />
        <SettingsRow
          icon={<HardDrive size={16} color="#64748B" />}
          label="Storage Quota"
          description="Alert when storage exceeds threshold"
          value="Phase 2"
        />
      </div>

      {/* About */}
      <div className="sp-settings-group">
        <div className="sp-settings-group__title">About</div>
        <SettingsRow
          icon={<Info size={16} color="#64748B" />}
          label="MailPilot"
          description="Privacy-first Gmail management Chrome Extension"
          value="v0.1.0"
        />
      </div>
    </div>
  )
}

