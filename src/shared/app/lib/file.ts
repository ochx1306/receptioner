import { appendUniqueSuffix } from '../utils/file'

export const generateUniqueCopyName = (name: string, names?: string[]): string => {
  const COPIED_SUFFIX = ' - コピー'

  return appendUniqueSuffix(name, COPIED_SUFFIX, names)
}
