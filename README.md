# MailPilot 🚀

**Take control of your inbox. Keep what matters.**

MailPilot is a privacy-first Chrome extension designed to make Gmail management simpler, smarter, and more efficient.

Managing multiple Gmail accounts and dealing with thousands of unnecessary emails can be overwhelming. MailPilot aims to solve this by helping users identify unwanted emails, organize their inboxes, and perform cleanup operations with greater control.

## ✨ Vision

The goal of MailPilot is to build a unified email management experience that helps users:

- Manage multiple Gmail accounts from one place.
- Identify unnecessary and outdated emails.
- Discover promotional emails, newsletters, and large attachments.
- Get intelligent inbox cleanup suggestions.
- Perform bulk email actions with user approval.
- Maintain privacy through local-first data processing.
- Optionally use AI-powered insights for smarter email management.

## 🔐 Privacy First

Privacy is a core principle of MailPilot.

- Local-first architecture wherever possible.
- No unnecessary collection of personal email data.
- User-controlled cleanup operations.
- No automatic permanent deletion of emails.
- Optional AI features with explicit user consent.

## 🛠️ Technology Stack

The planned technology stack includes:

| Technology | Purpose |
|---|---|
| React | User interface |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| Chrome Extension Manifest V3 | Extension architecture |
| Chrome APIs | Browser integration |
| Gmail API | Gmail account integration |
| IndexedDB | Local data storage |
| Dexie.js | IndexedDB management |
| Lucide React | Icons |

*The stack will evolve as the project develops.*

## 🏗️ Development Roadmap

MailPilot is being developed incrementally.

### Phase 1 — Extension Foundation
- [ ] Initialize React + TypeScript + Vite project.
- [ ] Configure Chrome Extension Manifest V3.
- [ ] Build the Chrome popup interface.
- [ ] Build the Chrome side panel workspace.
- [ ] Implement background service worker.
- [ ] Implement extension messaging.
- [ ] Add mock Gmail account data.
- [ ] Test local extension installation.

### Phase 2 — Gmail Integration
- [ ] Configure Google Cloud project.
- [ ] Enable Gmail API.
- [ ] Implement Google OAuth authentication.
- [ ] Connect Gmail accounts.
- [ ] Retrieve email metadata.
- [ ] Support multiple Gmail accounts.

### Phase 3 — Inbox Analysis
- [ ] Identify promotional emails.
- [ ] Detect old unread emails.
- [ ] Identify large attachments.
- [ ] Identify newsletters and recurring senders.
- [ ] Generate cleanup suggestions.

### Phase 4 — Smart Cleanup
- [ ] Implement bulk archive functionality.
- [ ] Implement trash functionality.
- [ ] Add user confirmation before cleanup.
- [ ] Add cleanup history and statistics.
- [ ] Improve cleanup recommendations.

### Phase 5 — Optional AI Features
- [ ] Explore AI-powered email categorization.
- [ ] Generate email insights.
- [ ] Provide intelligent cleanup recommendations.
- [ ] Implement explicit consent for AI processing.

### Phase 6 — Optimization and Release
- [ ] Improve performance.
- [ ] Strengthen privacy and security.
- [ ] Perform extension testing.
- [ ] Prepare Chrome Web Store listing.
- [ ] Publish the extension.

## 📁 Project Structure

The project structure will evolve during development. The initial extension foundation is expected to follow this structure:

```text
mailpilot/
├── public/
│   └── icons/
├── src/
│   ├── popup/
│   ├── sidepanel/
│   ├── background/
│   ├── components/
│   ├── shared/
│   ├── types/
│   └── utils/
├── manifest.json
├── vite.config.ts
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Google Chrome
- Git

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the project directory:

```bash
cd mailpilot
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

### Build the Extension

```bash
npm run build
```

### Load the Extension in Chrome

1. Open Google Chrome.
2. Navigate to `chrome://extensions/`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the generated extension build directory.

*Note: Exact development and build commands may evolve with the extension tooling configuration.*

## 🧭 Project Status

**Current stage:** Phase 1 — Extension Foundation

MailPilot is currently under active development. Gmail integration, authentication, inbox analysis, and cleanup functionality are planned for upcoming phases.

## 🤝 Contributing

MailPilot is currently a personal development project. Contributions, suggestions, and feedback are welcome as the project evolves.

## 📄 License

License information will be added before public distribution.
