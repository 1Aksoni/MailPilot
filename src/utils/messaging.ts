// ============================================================
// MailPilot — Chrome Runtime Messaging Utilities
// Wraps chrome.runtime.sendMessage with proper error handling
// and TypeScript types
// ============================================================

import type { ExtensionMessage, PingMessage, PongMessage } from '../types'

/**
 * Send a typed message to the background service worker.
 * Returns the response or null if the service worker is unavailable.
 *
 * Why we need this wrapper:
 * - chrome.runtime.lastError must be checked after every message send
 * - If the service worker has gone to sleep, it auto-wakes on message
 * - We want Promise-based async/await instead of callbacks
 */
export async function sendToBackground<T extends ExtensionMessage>(
  message: Omit<ExtensionMessage, 'timestamp'>
): Promise<T | null> {
  return new Promise((resolve) => {
    try {
      chrome.runtime.sendMessage(
        { ...message, timestamp: Date.now() },
        (response: T) => {
          // Always check lastError to avoid uncaught errors in console
          if (chrome.runtime.lastError) {
            console.warn(
              '[MailPilot] Background messaging error:',
              chrome.runtime.lastError.message
            )
            resolve(null)
            return
          }
          resolve(response ?? null)
        }
      )
    } catch (err) {
      console.warn('[MailPilot] Failed to send message to background:', err)
      resolve(null)
    }
  })
}

/**
 * Ping the background service worker and get a pong back.
 * Used to verify the service worker is alive.
 */
export async function pingBackground(
  source: PingMessage['source']
): Promise<PongMessage | null> {
  return sendToBackground<PongMessage>({
    type: 'PING',
    source,
  })
}

