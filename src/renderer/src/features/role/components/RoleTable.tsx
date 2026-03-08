import { CrudTable } from '@/app/framework/crud/components/CrudTable'
import { useCrud } from '@/app/framework/crud/useCrud'
import { roleColumns } from '../role-columns'
import { RoleForm } from './RoleForm'

export const RoleTable = () => {
  const { items, deleteItem } = useCrud('roles', window.api.role)

  return (
    <CrudTable
      featureName="役職"
      items={items}
      deleteItem={deleteItem}
      columns={roleColumns}
      CrudForm={RoleForm}
    />
  )
}
