import { useCrudForm, type CrudFormProps } from '@app/framework/crud/useCrudForm'
import { BaseForm } from '@app/components/base/form/BaseForm'
import { BaseTextInput } from '@/app/components/base/form/BaseTextInput'
import { useCrud } from '@/app/framework/crud/useCrud'
import { roleFormSchema, type Role, type RoleFormValues } from '../role-schema'

export const RoleForm = ({ crudMode, defaultValues, onSuccess }: CrudFormProps<Role>) => {
  const { insertItem, updateItem } = useCrud<Role>('roles', window.api.role)

  const { form, onSubmit } = useCrudForm<RoleFormValues, Role>({
    defaultValues: defaultValues ?? { name: '' },
    crudMode,
    formSchema: roleFormSchema,
    entityId: defaultValues?.id,
    createItem: insertItem,
    updateItem,
    onSuccess
  })

  return (
    <BaseForm form={form} onSubmit={onSubmit}>
      <BaseTextInput control={form.control} name="name" label="役職名" placeholder="役職名" />
    </BaseForm>
  )
}
