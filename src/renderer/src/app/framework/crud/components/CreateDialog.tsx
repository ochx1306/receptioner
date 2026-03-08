import type { ComponentType } from 'react'
import { CreateIconButton } from '@app/components/behavioral/base-icon-buttons'
import { BaseDialog } from '@app/components/base/BaseDialog'
import type { BaseEntity } from '@app/core/base'
import type { CrudFormProps } from '../useCrudForm'

interface CreateDialogProps<T extends BaseEntity> {
  featureName: string
  CrudForm: ComponentType<CrudFormProps<T>>
}

export const CreateDialog = <T extends BaseEntity>({
  featureName,
  CrudForm
}: CreateDialogProps<T>) => {
  return (
    <BaseDialog
      trigger={<CreateIconButton />}
      title={`${featureName}を作成`}
      description={`${featureName}を作成します。`}
    >
      {(onSuccess) => <CrudForm crudMode="create" onSuccess={onSuccess} />}
    </BaseDialog>
  )
}
