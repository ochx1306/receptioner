import type { ComponentType } from 'react'
import { CopyIconButton } from '@app/components/behavioral/base-icon-buttons'
import { BaseDialog } from '@app/components/base/BaseDialog'
import type { BaseEntity } from '@/app/lib/base'
import type { CrudFormProps } from '../useCrudForm'

interface CopyDialogProps<T extends BaseEntity> {
  originalName: string
  item: T
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const CopyDialog = <T extends BaseEntity>({
  originalName,
  item,
  CrudForm
}: CopyDialogProps<T>) => {
  return (
    <BaseDialog
      trigger={<CopyIconButton />}
      title={`${originalName}のコピーを作成`}
      description={`${originalName}のコピーを作成します。`}
    >
      {(onSuccess) => <CrudForm crudMode="create" defaultValues={item} onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
