export interface CsvHeader<T> {
  key: keyof T | ((item: T) => string | number | boolean | null | undefined)
  label: string
}

const escapeCsvValue = (value: unknown): string => {
  if (value === null || value === undefined) return ''

  const stringValue = String(value)

  if (
    stringValue.includes(',') ||
    stringValue.includes('"') ||
    stringValue.includes('\n') ||
    stringValue.includes('\r')
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

export const generateCsvString = <T>(data: T[], headers: CsvHeader<T>[]): string => {
  const headerRow = headers.map((h) => escapeCsvValue(h.label)).join(',')

  const dataRows = data.map((item) => {
    return headers
      .map((header) => {
        const value =
          typeof header.key === 'function' ? header.key(item) : item[header.key as keyof T]
        return escapeCsvValue(value)
      })
      .join(',')
  })

  return [headerRow, ...dataRows].join('\r\n')
}
