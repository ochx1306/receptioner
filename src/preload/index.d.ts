import { ElectronAPI } from '@electron-toolkit/preload'
import type { Role } from '@shared/features/role/role'

export interface CrudApi<T> {
  getAll: () => Promise<T[]>
  insert: (item: T) => Promise<{ success: boolean }>
  update: (item: T) => Promise<{ success: boolean }>
  delete: (id: string) => Promise<{ success: boolean }>
  bulkDelete: (ids: string[]) => Promise<{ success: boolean }>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      role: CrudApi<Role>
      file: {
        saveCsv: (
          defaultPath: string,
          content: string
        ) => Promise<{ success: boolean; filePath?: string }>
      }
    }
  }
}
