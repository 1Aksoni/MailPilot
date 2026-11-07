import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  manifest_version: 3,
  name: 'MailPilot',
  version: '0.1.0',
  description: 'Privacy-first Gmail management — manage, clean, and organise your Gmail accounts.',

  // Extension icons (we'll add real icons later)
  icons: {
    '16': 'icons/icon16.png',
    '32': 'icons/icon32.png',
    '48': 'icons/icon48.png',
    '128': 'icons/icon128.png',
  },

  // The popup that opens when user clicks the extension icon
  action: {
    default_popup: 'src/popup/popup.html',
    default_icon: {
      '16': 'icons/icon16.png',
      '32': 'icons/icon32.png',
    },
    default_title: 'MailPilot',
  },

  // The side panel workspace
  side_panel: {
    default_path: 'src/sidepanel/sidepanel.html',
  },

  // Background service worker — the brain of the extension
  background: {
    service_worker: 'src/background/service-worker.ts',
    type: 'module',
  },

  // Permissions needed for Phase 1 only
  permissions: [
    'storage',    // Chrome local storage for preferences
    'sidePanel',  // Chrome Side Panel API
    'tabs',       // Required to get the active tab ID for sidePanel.open()
  ],

  // No host permissions needed in Phase 1 (no Gmail API)
  host_permissions: [],
})
