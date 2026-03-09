import { z } from 'zod'
import { roleIdSchema, type RoleId, roleSchema, type Role } from '@shared/features/role/role'

export const roleFormSchema = roleSchema.omit({ id: true, createdAt: true, updatedAt: true })

export type RoleFormValues = z.infer<typeof roleFormSchema>

export { roleIdSchema, type RoleId, roleSchema, type Role }
