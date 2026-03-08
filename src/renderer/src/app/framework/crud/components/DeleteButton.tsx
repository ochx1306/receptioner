import { ConfirmDialog } from '@/app/components/behavioral/ConfirmDialog'
import { DeleteIconButton } from '@app/components/behavioral/base-icon-buttons'

interface DeleteButtonProps {
  itemName: string
  handleDelete: () => void
}

export const DeleteButton = ({ itemName, handleDelete }: DeleteButtonProps) => {
  return (
    <ConfirmDialog
      onConfirm={handleDelete}
      confirmVariant="destructive"
      trigger={<DeleteIconButton />}
      title={`「${itemName}」を削除しますか？`}
      description="この操作は取り消せません。"
      confirmText="削除"
    />
  )
}
