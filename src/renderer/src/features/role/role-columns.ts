import type { ColumnDef } from '@tanstack/react-table'
import type { Role } from './role-schema'

export const roleColumns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: '役職名'
  }
]
