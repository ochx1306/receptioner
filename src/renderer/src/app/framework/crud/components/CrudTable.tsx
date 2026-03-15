import { useState, useMemo, type ComponentType } from 'react'
import { useReactTable, getCoreRowModel, type ColumnDef } from '@tanstack/react-table'
import { generateUniqueCopyName } from '@shared/app/lib/file'
import type { BaseEntity } from '@/app/lib/base'
import { Separator } from '@/app/components/ui/separator'
import { Checkbox } from '@/app/components/ui/checkbox'
import { DataTable } from '@/app/components/behavioral/DataTable'
import type { CrudFormProps } from '../useCrudForm'
import { CreateDialog } from './CreateDialog'
import { UpdateDialog } from './UpdateDialog'
import { CopyDialog } from './CopyDialog'
import { DeleteButton } from './DeleteButton'
import { BulkDeleteButton } from './BulkDeleteButton'
import { ExportToCsvButton } from './ExportToCsvButton'

type BaseCrudTableProps<T extends BaseEntity> = {
  featureName: string
  allowExportToCsv?: boolean
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
      deleteItems?: never
    }
  | {
      allowDelete?: boolean
      deleteItem: (id: T['id']) => Promise<{ success: boolean }>
      deleteItems?: (ids: T['id'][]) => Promise<{ success: boolean }>
    }

export type CrudTableProps<T extends BaseEntity> = BaseCrudTableProps<T> &
  FormRequirement<T> &
  DeleteRequirement<T>

export const CrudTable = <T extends BaseEntity>({
  featureName,
  allowExportToCsv = true,
  HeaderActions,
  items,
  columns,
  allowCreate = true,
  allowUpdate = true,
  allowCopy = true,
  allowDelete = true,
  CrudForm,
  deleteItem,
  deleteItems,
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

          const copiedDefaultValues = {
            ...item,
            name: generateUniqueCopyName(
              item.name,
              items.map((i) => i.name)
            )
          }

          return (
            <div className="flex gap-2">
              {PrefixActions && <PrefixActions item={item} />}
              {allowCopy && CrudForm && (
                <CopyDialog
                  originalName={item.name}
                  item={copiedDefaultValues}
                  CrudForm={CrudForm}
                />
              )}
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

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data: items,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows
  const selectedRowsLength = selectedRows.length

  const handleBulkDelete = async () => {
    if (!deleteItems) return

    const ids = selectedRows.map((row) => row.original.id)

    await deleteItems(ids)

    table.resetRowSelection()
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{featureName}一覧</h1>
        <div className="flex gap-2">
          {HeaderActions && <HeaderActions />}
          {allowExportToCsv && <ExportToCsvButton table={table} featureName={featureName} />}
          <Separator orientation="vertical" />
          {allowCreate && CrudForm && (
            <CreateDialog featureName={featureName} CrudForm={CrudForm} />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between mb-6">
        <span className="font-medium text-foreground">{selectedRowsLength} 件選択中</span>
        {allowDelete && deleteItems && (
          <BulkDeleteButton itemCount={selectedRowsLength} handleDelete={handleBulkDelete} />
        )}
      </div>
      <DataTable table={table} />
    </div>
  )
}
