import { useState } from 'react'
import { generateCsvString, type CsvHeader } from '@app/utils/csv'

export const useExport = () => {
  const [isExporting, setIsExporting] = useState(false)

  const exportToCsv = async <T>(defaultFilename: string, data: T[], headers: CsvHeader<T>[]) => {
    setIsExporting(true)
    try {
      const csvContent = generateCsvString(data, headers)

      if (window.api && window.api.file) {
        await window.api.file.saveCsv(defaultFilename, csvContent)
      } else {
        const bom = new Uint8Array([0xef, 0xbb, 0xbf])
        const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = defaultFilename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('CSVエクスポートに失敗しました', error)
    } finally {
      setIsExporting(false)
    }
  }

  return { exportToCsv, isExporting }
}
