import type { Database } from 'better-sqlite3'
import type { BaseEntity, BaseId } from '@shared/app/lib/base'

/**
 * 型安全なCRUD関数群を一括生成するファクトリ
 * @param tableName 操作対象のテーブル名
 */
export const createCrudHandlers = <T extends BaseEntity>(tableName: string) => {
  return {
    insert: (db: Database, item: T): void => {
      const keys = Object.keys(item)
      const columns = keys.join(', ')
      const placeholders = keys.map((k) => `@${k}`).join(', ')
      const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`
      db.prepare(sql).run(item)
    },

    getAll: (db: Database): T[] => {
      const sql = `SELECT * FROM ${tableName} ORDER BY createdAt DESC`
      return db.prepare(sql).all() as T[]
    },

    getById: (db: Database, id: BaseId): T | undefined => {
      const sql = `SELECT * FROM ${tableName} WHERE id = ?`
      return db.prepare(sql).get(id) as T | undefined
    },

    update: (db: Database, item: T): void => {
      const keys = Object.keys(item).filter((k) => k !== 'id')
      const setClause = keys.map((k) => `${k} = @${k}`).join(', ')
      const sql = `UPDATE ${tableName} SET ${setClause} WHERE id = @id`

      const info = db.prepare(sql).run(item)
      if (info.changes === 0) {
        throw new Error(`Failed to update: Item ${item.id} not found in ${tableName}`)
      }
    },

    delete: (db: Database, id: BaseId): void => {
      const sql = `DELETE FROM ${tableName} WHERE id = ?`
      const info = db.prepare(sql).run(id)
      if (info.changes === 0) {
        throw new Error(`Failed to delete: Item ${id} not found in ${tableName}`)
      }
    },

    bulkDelete: (db: Database, ids: BaseId[]): void => {
      const sql = `DELETE FROM ${tableName} WHERE id IN (${ids.map(() => '?').join(', ')})`
      const info = db.prepare(sql).run(ids)
      if (info.changes === 0) {
        throw new Error(`Failed to delete: Items ${ids} not found in ${tableName}`)
      }
    }
  }
}
