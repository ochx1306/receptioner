import { z } from 'zod'
import { baseIdSchema, baseEntitySchema } from '@/app/lib/base'
import { roleIdSchema } from '../role/role-schema'

export const memberIdSchema = baseIdSchema.brand<'MemberId'>()

export type MemberId = z.infer<typeof memberIdSchema>

export const memberSchema = baseEntitySchema.extend({
  id: memberIdSchema,
  // organizationId: appIdSchema,
  fiscalYear: z.number().min(1970, '年度（西暦）を半角数字で入力してください'),
  roleId: roleIdSchema,
  index: z.number(),
  downloadCount: z.number().default(0)
})
export type Member = z.infer<typeof memberSchema>

export const memberFormSchema = memberSchema.omit({
  id: true,
  name: true,
  downloadCount: true
})
export type MemberFormValues = z.infer<typeof memberFormSchema>
