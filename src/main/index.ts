import { app, BrowserWindow, ipcMain } from 'electron'
import is from 'electron-is'
import { join } from 'path'
import { InputService } from './services/inputService'

let mainWindow: BrowserWindow | null
const inputService = new InputService()

function createMainWindow(): void {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  if (is.dev() && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  createMainWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IPC handlers
ipcMain.handle('find-devices', () => {
  return inputService.findDevices()
})

ipcMain.handle('receive-input', (event, deviceId: string) => {
  inputService.receiveInput(deviceId, (input) => {
    event.sender.send('input-received', input)
  })
})

ipcMain.handle('connect-to-virtual-device', (_, deviceId: string) => {
  return inputService.connectToVirtualDevice(deviceId)
})

ipcMain.handle('write-output', (_, deviceId: string, output: unknown) => {
  return inputService.writeOutput(deviceId, output)
})
