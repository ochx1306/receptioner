import { ipcMain } from 'electron'
import type { Database } from 'better-sqlite3'
import { createCrudHandlers } from './db-crud'
import type { BaseEntity, BaseId } from '@shared/app/core/base'

type DbHandlers<T> = ReturnType<typeof createCrudHandlers<T & BaseEntity>>

export const registerCrudIpc = <T extends BaseEntity>(
  featureName: string,
  db: Database,
  dbHandlers: DbHandlers<T>
) => {
  ipcMain.handle(`${featureName}:getAll`, () => {
    return dbHandlers.getAll(db)
  })

  ipcMain.handle(`${featureName}:insert`, (_event, item: T) => {
    dbHandlers.insert(db, item)
    return { success: true }
  })

  ipcMain.handle(`${featureName}:update`, (_event, item: T) => {
    dbHandlers.update(db, item)
    return { success: true }
  })

  ipcMain.handle(`${featureName}:delete`, (_event, id: BaseId) => {
    dbHandlers.delete(db, id)
    return { success: true }
  })
}
