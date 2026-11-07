// ============================================================
// MailPilot — Mock Data
// Phase 1 only. No real Gmail accounts are connected.
// All data here is fabricated for UI development purposes.
// ============================================================

import type { MockAccount, CleanupStats } from '../types'

export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    id: 'mock-account-1',
    email: 'user.one@gmail.com',
    displayName: 'User One',
    avatar: '#3B82F6',       // blue
    status: 'active',
    unreadCount: 142,
    totalEmails: 8_430,
    storageUsedMB: 7_340,
    storageLimitMB: 15_360,  // 15 GB in MB
    isDemo: true,
    lastSynced: '2024-01-15T10:30:00Z',
  },
  {
    id: 'mock-account-2',
    email: 'user.two@gmail.com',
    displayName: 'User Two',
    avatar: '#8B5CF6',       // purple
    status: 'active',
    unreadCount: 37,
    totalEmails: 3_210,
    storageUsedMB: 2_890,
    storageLimitMB: 15_360,
    isDemo: true,
    lastSynced: '2024-01-15T09:45:00Z',
  },
]

export const MOCK_CLEANUP_STATS: CleanupStats = {
  promotionalEmails: 1_204,
  unreadOlderThan30Days: 876,
  largeAttachments: 43,
  potentialSavingsMB: 2_100,
}

// Helper: get initials from a display name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Helper: format MB as human-readable storage string
export function formatStorage(mb: number): string {
  if (mb >= 1024) {
    return `${(mb / 1024).toFixed(1)} GB`
  }
  return `${mb} MB`
}

// Helper: get storage usage percentage
export function storagePercent(used: number, limit: number): number {
  return Math.round((used / limit) * 100)
}

