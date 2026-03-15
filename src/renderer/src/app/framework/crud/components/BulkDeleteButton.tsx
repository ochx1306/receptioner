import { ConfirmDialog } from '@/app/components/behavioral/ConfirmDialog'
import { DeleteIconButton } from '@app/components/behavioral/base-icon-buttons'

interface BulkDeleteButtonProps {
  itemCount: number
  handleDelete: () => void
}

export const BulkDeleteButton = ({ itemCount, handleDelete }: BulkDeleteButtonProps) => {
  return (
    <ConfirmDialog
      onConfirm={handleDelete}
      confirmVariant="destructive"
      trigger={<DeleteIconButton label="一括削除" disabled={itemCount === 0} />}
      title={`${itemCount}件のデータを削除しますか？`}
      description="この操作は取り消せません。"
      confirmText="削除"
    />
  )
}
