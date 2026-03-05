import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getTodos: () => Promise<{ id: number; title: string }[]>
      addTodo: (title: string) => Promise<{ id: number; title: string }>
    }
  }
}
