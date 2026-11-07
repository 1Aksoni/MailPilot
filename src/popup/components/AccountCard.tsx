// ============================================================
// AccountCard — Displays a single mock account in the popup
// ============================================================

import type { MockAccount } from '../../types'
import { getInitials, formatStorage, storagePercent } from '../../shared/mockData'

interface AccountCardProps {
  account: MockAccount
}

export default function AccountCard({ account }: AccountCardProps) {
  const usedPercent = storagePercent(account.storageUsedMB, account.storageLimitMB)

  return (
    <div className="account-card">
      {/* Avatar + Email row */}
      <div className="account-card__header">
        <div
          className="account-card__avatar"
          style={{ backgroundColor: account.avatar }}
        >
          {getInitials(account.displayName)}
        </div>
        <div className="account-card__info">
          <span className="account-card__email">{account.email}</span>
          <span className="account-card__unread">
            {account.unreadCount.toLocaleString()} unread
          </span>
        </div>
        <span className="account-card__demo-badge">DEMO</span>
      </div>

      {/* Storage bar */}
      <div className="account-card__storage">
        <div className="account-card__storage-bar">
          <div
            className="account-card__storage-fill"
            style={{
              width: `${usedPercent}%`,
              backgroundColor: usedPercent > 80 ? '#EF4444' : '#3B82F6',
            }}
          />
        </div>
        <span className="account-card__storage-label">
          {formatStorage(account.storageUsedMB)} / {formatStorage(account.storageLimitMB)}
        </span>
      </div>
    </div>
  )
}

