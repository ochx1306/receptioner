import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Database from 'better-sqlite3'
import { registerCrudIpc } from './app/lib/crud-ipc'
import { registerFileIpc } from './app/lib/file-ipc'
import { initRoleTable, roleHandlers } from './features/role/role-db'

let db: Database.Database | null = null

const setupFeatures = (database: Database.Database) => {
  const features = [{ name: 'role', initTable: initRoleTable, handlers: roleHandlers }]

  features.forEach((feature) => {
    feature.initTable(database)
    registerCrudIpc(feature.name, database, feature.handlers)
  })
}

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const dbPath = path.join(app.getPath('userData'), 'database.sqlite')
  db = new Database(dbPath)

  setupFeatures(db)

  registerFileIpc()

  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (db) {
    db.close()
  }
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
