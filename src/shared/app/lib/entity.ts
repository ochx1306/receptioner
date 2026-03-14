import { labelCopiedSuffix } from '../utils/file'
import { generateId, type BaseEntity } from './base'

export const cloneWithNewId = <T extends BaseEntity>(entity: T): T => {
  return {
    ...structuredClone(entity),
    id: generateId<typeof entity.id>()
  }
}

export const cloneWithCopiedSuffix = <T extends BaseEntity>(
  entity: T,
  entities?: T[],
  suffix?: string
): T => {
  return {
    ...cloneWithNewId(entity),
    name: labelCopiedSuffix(
      entity.name,
      entities?.map((e) => e.name),
      suffix
    )
  }
}
