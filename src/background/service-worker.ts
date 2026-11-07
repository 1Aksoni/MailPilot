// ============================================================
// MailPilot — Background Service Worker
// Manifest V3 service worker. Runs in the background with no DOM.
//
// Key facts about MV3 service workers (important for MERN devs):
// - This is NOT a Node.js environment — no require(), no fs, etc.
// - It has no window or document objects
// - It can go to sleep when idle and wakes up on events/messages
// - It persists state via chrome.storage, not in-memory variables
// ============================================================

import type { ExtensionMessage, PongMessage, StatusResponseMessage } from '../types'

const EXTENSION_VERSION = '0.1.0'

// ----------------------------------------------------------------
// Lifecycle Events
// ----------------------------------------------------------------

chrome.runtime.onInstalled.addListener((details) => {
  console.log('[MailPilot SW] Extension installed/updated:', details.reason)

  // Set up initial storage on install
  if (details.reason === 'install') {
    chrome.storage.local.set({
      mailpilot_installed_at: new Date().toISOString(),
      mailpilot_version: EXTENSION_VERSION,
    })
  }
})

// ----------------------------------------------------------------
// Side Panel Configuration
// Enable the side panel to open on action click IF needed
// (In Phase 1 we open it via the popup button instead)
// ----------------------------------------------------------------

chrome.runtime.onInstalled.addListener(() => {
  // Allow the side panel to be opened programmatically
  chrome.sidePanel.setOptions({
    enabled: true,
  })
})

// ----------------------------------------------------------------
// Message Listener
// All communication from popup and side panel comes through here
// ----------------------------------------------------------------

chrome.runtime.onMessage.addListener(
  (
    message: ExtensionMessage,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: ExtensionMessage) => void
  ) => {
    console.log('[MailPilot SW] Message received:', message.type, 'from:', sender.url)

    // Handle each message type
    switch (message.type) {
      case 'PING': {
        const response: PongMessage = {
          type: 'PONG',
          source: 'background',
          message: `MailPilot Service Worker v${EXTENSION_VERSION} is active! 🚀`,
          timestamp: Date.now(),
        }
        sendResponse(response)
        break
      }

      case 'GET_STATUS': {
        const response: StatusResponseMessage = {
          type: 'STATUS_RESPONSE',
          status: 'ok',
          version: EXTENSION_VERSION,
          source: 'background',
          timestamp: Date.now(),
        }
        sendResponse(response)
        break
      }

      default: {
        console.warn('[MailPilot SW] Unknown message type:', (message as ExtensionMessage).type)
        sendResponse({
          type: 'STATUS_RESPONSE',
          status: 'error',
          version: EXTENSION_VERSION,
          source: 'background',
          timestamp: Date.now(),
        } as StatusResponseMessage)
      }
    }

    // Return true to keep the message channel open for async sendResponse
    // This is required for async message handlers in MV3
    return true
  }
)

console.log('[MailPilot SW] Service worker script loaded.')

