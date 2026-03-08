import { z } from 'zod'
import { baseEntitySchema } from '../../app/core/base'

export const roleSchema = baseEntitySchema.extend({
  name: z.string().min(1, '役職名を入力してください')
})

export type Role = z.infer<typeof roleSchema>
