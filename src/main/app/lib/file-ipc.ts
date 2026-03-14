import { ipcMain, dialog } from 'electron'
import fs from 'fs'

export const registerFileIpc = () => {
  ipcMain.handle('file:saveCsv', async (_, { defaultPath, content }) => {
    const { canceled, filePath } = await dialog.showSaveDialog({
      defaultPath,
      filters: [
        { name: 'CSV ファイル', extensions: ['csv'] },
        { name: 'すべてのファイル', extensions: ['*'] }
      ]
    })

    if (canceled || !filePath) return { success: false }

    const bom = '\uFEFF'
    fs.writeFileSync(filePath, bom + content, 'utf8')

    return { success: true, filePath }
  })
}
