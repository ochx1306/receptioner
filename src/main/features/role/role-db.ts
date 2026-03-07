import type { Database } from 'better-sqlite3'
import { createCrudHandlers } from '../../app/lib/db-crud'
import type { Role } from '@shared/app/core/role'

export const ROLE_TABLE = 'roles'

export const initRoleTable = (db: Database) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS ${ROLE_TABLE} (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `)
}

export const roleHandlers = createCrudHandlers<Role>(ROLE_TABLE)
