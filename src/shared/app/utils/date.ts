export const getFiscalYear = (date: Date): number => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1

  return month <= 3 ? year - 1 : year
}

export const formatToJapaneseEra = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export const formatToJapaneseFiscalYear = (targetYear: number): string => {
  const tempDate = new Date(targetYear, 3, 1)

  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'long',
    year: 'numeric'
  })

  return formatter.format(tempDate).replace('年', '年度')
}

export const getJapaneseFiscalYearString = (date: Date): string => {
  const fiscalYear = getFiscalYear(date)
  return formatToJapaneseFiscalYear(fiscalYear)
}
