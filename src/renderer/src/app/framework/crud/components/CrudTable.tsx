import { useMemo, type ComponentType } from 'react'
// import { BaseDataTable } from '@/components/data-table'
// import type { ColumnDef } from '@/components/data-table/column'
import { DataTable } from '@/app/components/behavioral/DataTable'
import type { ColumnDef } from '@tanstack/react-table'
import type { BaseEntity } from '@app/core/base'
import type { CrudFormProps } from '../useCrudForm'
import { CreateDialog } from './CreateDialog'
import { UpdateDialog } from './UpdateDialog'
import { DeleteButton } from './DeleteButton'

type BaseCrudTableProps<T extends BaseEntity> = {
  featureName: string
  HeaderActions?: ComponentType
  items: T[]
  columns: ColumnDef<T>[]
  PrefixActions?: ComponentType<{ item: T }>
}

type FormRequirement<T extends BaseEntity> =
  | {
      allowCreate: false
      allowUpdate: false
      CrudForm?: never
    }
  | {
      allowCreate?: boolean
      allowUpdate?: boolean
      CrudForm: ComponentType<CrudFormProps<T>>
    }

type DeleteRequirement<T extends BaseEntity> =
  | {
      allowDelete: false
      deleteItem?: never
    }
  | {
      allowDelete?: boolean
      deleteItem: (id: T['id']) => void
    }

export type CrudTableProps<T extends BaseEntity> = BaseCrudTableProps<T> &
  FormRequirement<T> &
  DeleteRequirement<T>

export const CrudTable = <T extends BaseEntity>({
  featureName,
  HeaderActions,
  items,
  columns,
  allowCreate = true,
  allowUpdate = true,
  allowDelete = true,
  CrudForm,
  deleteItem,
  PrefixActions
}: CrudTableProps<T>) => {
  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    return [
      ...columns,
      {
        id: 'actions',
        header: '操作',
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex gap-2">
              {PrefixActions && <PrefixActions item={item} />}
              {allowUpdate && CrudForm && (
                <UpdateDialog featureName={featureName} item={item} CrudForm={CrudForm} />
              )}
              {allowDelete && deleteItem && (
                <DeleteButton itemName={item.name} handleDelete={() => deleteItem(item.id)} />
              )}
            </div>
          )
        }
      }
    ]
  }, [columns, PrefixActions, allowUpdate, featureName, CrudForm, allowDelete, deleteItem])

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{featureName}一覧</h1>
        <div className="flex gap-2">
          {HeaderActions && <HeaderActions />}
          {allowCreate && CrudForm && (
            <CreateDialog featureName={featureName} CrudForm={CrudForm} />
          )}
        </div>
      </div>
      <DataTable columns={tableColumns} data={items} />
    </div>
  )
}
