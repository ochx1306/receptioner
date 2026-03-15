import { z } from 'zod'
import {
  organizationIdSchema,
  type OrganizationId,
  organizationSchema,
  type Organization
} from '@shared/features/organization/organization'

export const organizationFormSchema = organizationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export type OrganizationFormValues = z.infer<typeof organizationFormSchema>

export { organizationIdSchema, type OrganizationId, organizationSchema, type Organization }
