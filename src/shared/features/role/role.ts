import { z } from 'zod'
import { baseIdSchema, baseEntitySchema } from '@shared/app/lib/base'

export const roleIdSchema = baseIdSchema.brand<'RoleId'>()

export type RoleId = z.infer<typeof roleIdSchema>

export const roleSchema = baseEntitySchema.extend({
  id: roleIdSchema,
  name: z.string().min(1, '役職名を入力してください')
})

export type Role = z.infer<typeof roleSchema>
