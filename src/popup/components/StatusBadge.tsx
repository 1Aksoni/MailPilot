// ============================================================
// StatusBadge — Shows service worker connection status in popup
// ============================================================

interface StatusBadgeProps {
  status: 'connected' | 'disconnected' | 'checking'
  message?: string
}

export default function StatusBadge({ status, message }: StatusBadgeProps) {
  const config = {
    connected: { label: 'Connected', color: '#10B981', dot: '#10B981' },
    disconnected: { label: 'Disconnected', color: '#EF4444', dot: '#EF4444' },
    checking: { label: 'Checking…', color: '#F59E0B', dot: '#F59E0B' },
  }[status]

  return (
    <div className="status-badge">
      <span
        className="status-badge__dot"
        style={{ backgroundColor: config.dot }}
      />
      <span className="status-badge__label" style={{ color: config.color }}>
        {message ?? config.label}
      </span>
    </div>
  )
}

