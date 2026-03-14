export const labelCopiedSuffix = (
  name: string,
  names?: string[],
  suffix: string = ' - コピー'
): string => {
  const baseSuffix = suffix

  const escapedSuffix = baseSuffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`^(.*?)(?:${escapedSuffix}(?:\\s\\(\\d+\\))?)?$`)
  const match = name.match(regex)

  const baseName = match ? match[1] : name

  const existingNames = new Set(names || [])

  let count = 0
  const generateSuffix = () => {
    return count === 0 ? baseSuffix : `${baseSuffix} (${count + 1})`
  }

  let newName = `${baseName}${generateSuffix()}`

  while (newName === name || existingNames.has(newName)) {
    count++
    newName = `${baseName}${generateSuffix()}`
  }

  return newName
}
