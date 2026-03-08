import type { ComponentType } from 'react'
import { UpdateIconButton } from '@app/components/behavioral/base-icon-buttons'
import { BaseDialog } from '@app/components/base/BaseDialog'
import type { BaseEntity } from '@app/core/base'
import type { CrudFormProps } from '../useCrudForm'

interface UpdateDialogProps<T extends BaseEntity> {
  featureName: string
  item: T
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const UpdateDialog = <T extends BaseEntity>({
  featureName,
  item,
  CrudForm
}: UpdateDialogProps<T>) => {
  return (
    <BaseDialog
      trigger={<UpdateIconButton />}
      title={`${featureName}を更新`}
      description={`${featureName}を更新します。`}
    >
      {(onSuccess) => <CrudForm crudMode="update" defaultValues={item} onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
