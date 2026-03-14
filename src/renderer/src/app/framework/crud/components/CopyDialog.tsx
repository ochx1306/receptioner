import type { ComponentType } from 'react'
import { CopyIconButton } from '@app/components/behavioral/base-icon-buttons'
import { BaseDialog } from '@app/components/base/BaseDialog'
import type { BaseEntity } from '@/app/lib/base'
import type { CrudFormProps } from '../useCrudForm'

interface CopyDialogProps<T extends BaseEntity> {
  item: T
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const CopyDialog = <T extends BaseEntity>({ item, CrudForm }: CopyDialogProps<T>) => {
  return (
    <BaseDialog
      trigger={<CopyIconButton />}
      title={`${item.name}のコピーを作成`}
      description={`${item.name}のコピーを作成します。`}
    >
      {(onSuccess) => <CrudForm crudMode="create" defaultValues={item} onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
