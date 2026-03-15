import { z } from 'zod'
import { baseIdSchema, baseEntitySchema } from '@shared/app/lib/base'

export const organizationIdSchema = baseIdSchema.brand<'OrganizationId'>()

export type OrganizationId = z.infer<typeof organizationIdSchema>

export const organizationSchema = baseEntitySchema.extend({
  name: z.string().min(1, '組織名を入力してください'),
  type: z.enum(['unit', 'group']),
  parentId: organizationIdSchema.nullable(),
  validFrom: z.iso.date(),
  validTo: z.iso.date().nullable(),
  isProvisional: z.boolean(),
  isSuspended: z.boolean()
})

export type Organization = z.infer<typeof organizationSchema>
