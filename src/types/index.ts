// ============================================================
// MailPilot — Shared TypeScript Types
// Used across popup, side panel, and background service worker
// ============================================================

// ------------------------------------------------------------------
// Mock Account Types (Phase 1 — no real Gmail connection)
// ------------------------------------------------------------------

export type AccountStatus = 'active' | 'syncing' | 'error' | 'demo'

export interface MockAccount {
  id: string
  email: string
  displayName: string
  avatar: string         // Initials-based avatar color
  status: AccountStatus
  unreadCount: number
  totalEmails: number
  storageUsedMB: number
  storageLimitMB: number
  isDemo: true           // Always true in Phase 1 — clearly marks mock data
  lastSynced: string     // ISO date string
}

// ------------------------------------------------------------------
// Cleanup Stats Types (mock data for Phase 1 UI)
// ------------------------------------------------------------------

export interface CleanupStats {
  promotionalEmails: number
  unreadOlderThan30Days: number
  largeAttachments: number       // emails with attachments > 5MB
  potentialSavingsMB: number
}

// ------------------------------------------------------------------
// Chrome Extension Messaging Types
// All messages between popup ↔ background ↔ side panel use these shapes
// ------------------------------------------------------------------

export type MessageType =
  | 'GET_STATUS'
  | 'STATUS_RESPONSE'
  | 'GET_ACCOUNTS'
  | 'ACCOUNTS_RESPONSE'
  | 'OPEN_SIDE_PANEL'
  | 'PING'
  | 'PONG'

export interface BaseMessage {
  type: MessageType
  timestamp: number
}

export interface GetStatusMessage extends BaseMessage {
  type: 'GET_STATUS'
}

export interface StatusResponseMessage extends BaseMessage {
  type: 'STATUS_RESPONSE'
  status: 'ok' | 'error'
  version: string
  source: 'background'
}

export interface PingMessage extends BaseMessage {
  type: 'PING'
  source: 'popup' | 'sidepanel'
}

export interface PongMessage extends BaseMessage {
  type: 'PONG'
  source: 'background'
  message: string
}

export type ExtensionMessage =
  | GetStatusMessage
  | StatusResponseMessage
  | PingMessage
  | PongMessage

// ------------------------------------------------------------------
// Navigation Types (side panel)
// ------------------------------------------------------------------

export type SidePanelPage = 'dashboard' | 'accounts' | 'cleanup' | 'settings'

export interface NavItem {
  id: SidePanelPage
  label: string
  icon: string  // Lucide icon name
}

