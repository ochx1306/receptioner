import { useMemo, type ComponentType } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { BaseEntity } from '@/app/lib/base'
import { Checkbox } from '@/app/components/ui/checkbox'
import { DataTable } from '@/app/components/behavioral/DataTable'
import type { CrudFormProps } from '../useCrudForm'
import { CreateDialog } from './CreateDialog'
import { UpdateDialog } from './UpdateDialog'
import { CopyDialog } from './CopyDialog'
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
      allowCopy: false
      CrudForm?: never
    }
  | {
      allowCreate?: boolean
      allowUpdate?: boolean
      allowCopy?: boolean
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
  allowCopy = true,
  allowDelete = true,
  CrudForm,
  deleteItem,
  PrefixActions
}: CrudTableProps<T>) => {
  const tableColumns = useMemo<ColumnDef<T>[]>(() => {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="すべての行を選択"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="行を選択"
          />
        ),
        meta: { excludeFromExport: true },
        enableSorting: false,
        enableHiding: false
      },
      ...columns,
      {
        id: 'actions',
        header: '操作',
        meta: { excludeFromExport: true },
        cell: ({ row }) => {
          const item = row.original
          return (
            <div className="flex gap-2">
              {PrefixActions && <PrefixActions item={item} />}
              {allowCopy && CrudForm && <CopyDialog item={item} CrudForm={CrudForm} />}
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
