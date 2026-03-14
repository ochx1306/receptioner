import type { Table } from '@tanstack/react-table'
import { generateTimestamp, type BaseEntity } from '@shared/app/lib/base'
import type { CsvHeader } from '@/app/utils/csv'
import { useExport } from '@app/hooks/useExport'
import { ExportIconButton } from '@/app/components/behavioral/base-icon-buttons'

interface ExportToCsvButtonProps<T extends BaseEntity> {
  table: Table<T>
  featureName: string
}

export const ExportToCsvButton = <T extends BaseEntity>({
  table,
  featureName
}: ExportToCsvButtonProps<T>) => {
  const { exportToCsv, isExporting } = useExport()

  const handleExport = () => {
    const currentData = table.getRowModel().rows.map((row) => row.original)

    const headers = table
      .getVisibleLeafColumns()
      .filter((column) => !column.columnDef.meta?.excludeFromExport)
      .map((column): CsvHeader<T> => {
        const exportLabel =
          column.columnDef.meta?.exportLabel ||
          (typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id)

        return {
          key: column.id as keyof T,
          label: exportLabel
        }
      })

    const filename = `${featureName}一覧_${generateTimestamp()}.csv`

    exportToCsv(filename, currentData, headers)
  }

  return (
    <ExportIconButton
      label="CSVとしてエクスポート"
      variant="outline"
      size="sm"
      onClick={handleExport}
      disabled={isExporting}
    />
  )
}
