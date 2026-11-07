// ============================================================
// Accounts Page — Side Panel
// ============================================================

import { AlertCircle } from 'lucide-react'
import { MOCK_ACCOUNTS, getInitials, formatStorage, storagePercent } from '../../shared/mockData'

export default function AccountsPage() {
  return (
    <div>
      <div className="sp-demo-banner">
        <AlertCircle size={14} color="#D97706" />
        <span>These are <strong>demo accounts</strong>. Connect real Gmail accounts in Phase 2.</span>
      </div>

      <div className="sp-account-list">
        {MOCK_ACCOUNTS.map((account) => {
          const usedPercent = storagePercent(account.storageUsedMB, account.storageLimitMB)
          return (
            <div key={account.id} className="sp-account-card">
              {/* Header */}
              <div className="sp-account-card__header">
                <div
                  className="sp-account-card__avatar"
                  style={{ backgroundColor: account.avatar }}
                >
                  {getInitials(account.displayName)}
                </div>
                <div>
                  <div className="sp-account-card__email">{account.email}</div>
                  <div className="sp-account-card__name">{account.displayName}</div>
                </div>
                <span className="sp-account-card__badge">DEMO</span>
              </div>

              {/* Meta stats */}
              <div className="sp-account-card__meta">
                <div className="sp-account-meta-item">
                  <span className="sp-account-meta-item__value">
                    {account.unreadCount.toLocaleString()}
                  </span>
                  <span className="sp-account-meta-item__label">Unread</span>
                </div>
                <div className="sp-account-meta-item">
                  <span className="sp-account-meta-item__value">
                    {account.totalEmails.toLocaleString()}
                  </span>
                  <span className="sp-account-meta-item__label">Total</span>
                </div>
                <div className="sp-account-meta-item">
                  <span className="sp-account-meta-item__value">{usedPercent}%</span>
                  <span className="sp-account-meta-item__label">Storage</span>
                </div>
              </div>

              {/* Storage bar */}
              <div className="sp-account-card__storage-label">
                <span>Storage used</span>
                <span>
                  {formatStorage(account.storageUsedMB)} / {formatStorage(account.storageLimitMB)}
                </span>
              </div>
              <div className="sp-storage-bar">
                <div
                  className="sp-storage-bar__fill"
                  style={{
                    width: `${usedPercent}%`,
                    backgroundColor: usedPercent > 80 ? '#EF4444' : '#3B82F6',
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

