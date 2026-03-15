export const appendUniqueSuffix = (name: string, suffix: string, names?: string[]): string => {
  const escapedSuffix = suffix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`^(.*?)(?:${escapedSuffix}(?:\\s\\(\\d+\\))?)?$`)
  const match = name.match(regex)

  const baseName = match ? match[1] : name

  const existingNames = new Set(names || [])

  let count = 0
  const generateSuffix = () => {
    return count === 0 ? suffix : `${suffix} (${count + 1})`
  }

  let newName = `${baseName}${generateSuffix()}`

  while (newName === name || existingNames.has(newName)) {
    count++
    newName = `${baseName}${generateSuffix()}`
  }

  return newName
}
