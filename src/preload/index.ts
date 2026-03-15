import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const createCrudApi = (featureName: string) => ({
  getAll: () => ipcRenderer.invoke(`${featureName}:getAll`),
  insert: (item: any) => ipcRenderer.invoke(`${featureName}:insert`, item),
  update: (item: any) => ipcRenderer.invoke(`${featureName}:update`, item),
  delete: (id: string) => ipcRenderer.invoke(`${featureName}:delete`, id),
  bulkDelete: (ids: string[]) => ipcRenderer.invoke(`${featureName}:bulkDelete`, ids)
})

const api = {
  role: createCrudApi('role'),
  file: {
    saveCsv: (defaultPath: string, content: string) =>
      ipcRenderer.invoke('file:saveCsv', { defaultPath, content })
  }
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
