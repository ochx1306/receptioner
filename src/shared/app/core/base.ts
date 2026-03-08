import { z } from 'zod'

export const baseIdSchema = z.uuid()
export type BaseId = z.infer<typeof baseIdSchema>

export const baseEntitySchema = z.object({
  id: baseIdSchema,
  name: z.string().min(1, 'エンティティ名を入力してください'),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime()
})

export type BaseEntity = z.infer<typeof baseEntitySchema>

export const generateId = <T extends string>(): T => {
  return crypto.randomUUID() as T
}

export const generateTimestamp = (): string => new Date().toISOString()
