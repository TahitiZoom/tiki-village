interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  onClose?: () => void
}

export default function Alert({ type = 'info', title, message, onClose }: AlertProps) {
  const styles = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: '✓',
      iconBg: 'bg-green-200',
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: '✕',
      iconBg: 'bg-red-200',
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      icon: '⚠',
      iconBg: 'bg-yellow-200',
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: 'ℹ',
      iconBg: 'bg-blue-200',
    },
  }

  const style = styles[type]

  return (
    <div className={`border rounded-lg p-4 ${style.container} flex items-start space-x-3`}>
      <div className={`${style.iconBg} rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0`}>
        {style.icon}
      </div>
      <div className="flex-grow">
        {title && <div className="font-semibold mb-1">{title}</div>}
        <div className="text-sm">{message}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity flex-shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  )
}
