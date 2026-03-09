import { generateId, type BaseEntity } from '../lib/base'

export const cloneWithNewId = <T extends BaseEntity>(entity: T): T => {
  const clonedEntity = structuredClone(entity)
  const newId = generateId<typeof entity.id>()

  return { ...clonedEntity, id: newId }
}
