import type { ReactNode } from 'react'
import { Button } from '@app/components/ui/button'
import { BaseDialog } from '../base/BaseDialog'

interface ConfirmDialogProps {
  trigger: ReactNode
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  confirmVariant?: 'default' | 'destructive'
}

export const ConfirmDialog = ({
  trigger,
  title,
  description,
  confirmText = '確認',
  cancelText = 'キャンセル',
  onConfirm,
  confirmVariant = 'default'
}: ConfirmDialogProps) => {
  return (
    <BaseDialog trigger={trigger} title={title} description={description} maxWidth="sm">
      {(closeDialog) => {
        const handleConfirm = () => {
          onConfirm()
          closeDialog()
        }

        return (
          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" variant="outline" onClick={closeDialog}>
              {cancelText}
            </Button>
            <Button type="button" variant={confirmVariant} onClick={handleConfirm}>
              {confirmText}
            </Button>
          </div>
        )
      }}
    </BaseDialog>
  )
}
