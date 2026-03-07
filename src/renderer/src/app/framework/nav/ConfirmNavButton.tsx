import type { ReactNode, MouseEvent } from 'react'
import { useNavigate, type NavigateOptions } from '@tanstack/react-router'
import { ConfirmDialog } from '@app/components/behavioral/ConfirmDialog'

interface ConfirmNavButtonProps {
  navigateOptions: NavigateOptions
  children: ReactNode
  requireConfirm?: boolean
  title?: string
  description?: string
  confirmText?: string
  className?: string
  disabled?: boolean
}

export const ConfirmNavButton = ({
  navigateOptions,
  children,
  requireConfirm = true,
  title = 'ページを移動しますか？',
  description = '保存されていないデータは失われます。本当によろしいですか？',
  confirmText = '移動する',
  className,
  disabled = false
}: ConfirmNavButtonProps) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(navigateOptions)
  }

  const handleTriggerClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault()
      return
    }

    if (!requireConfirm) {
      e.preventDefault()
      handleNavigate()
    }
  }

  return (
    <ConfirmDialog
      title={title}
      description={description}
      confirmText={confirmText}
      confirmVariant="destructive"
      onConfirm={handleNavigate}
      trigger={
        <button
          type="button"
          className={className}
          disabled={disabled}
          onClick={handleTriggerClick}
        >
          {children}
        </button>
      }
    />
  )
}
