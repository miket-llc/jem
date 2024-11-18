import { app, BrowserWindow } from 'electron'
import is from 'electron-is'
import { join } from 'path'
import { InputService } from './services/inputService'
import { SyntheticJoystick } from './services/syntheticJoystick'

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
  return inputService.writeOutput(deviceId, output as string)
})

// Synthetic joystick and IPC handlers
// Create a singleton instance of SyntheticJoystick
const joystick = new SyntheticJoystick()

// Example: Start emitting synthetic inputs at 60Hz for logging or debugging
joystick.startEmitting((state) => {
  console.log('Synthetic joystick state:', state)
}, 16)

// Expose the joystick instance to the preload script through IPC handlers
import { ipcMain } from 'electron'

ipcMain.handle('joystick:setAxis', (_event, axis: 'x' | 'y' | 'z', value: number) => {
  joystick.setAxis(axis, value)
})

ipcMain.handle('joystick:pressButton', (_event, buttonId: number) => {
  joystick.pressButton(buttonId)
})

ipcMain.handle('joystick:releaseButton', (_event, buttonId: number) => {
  joystick.releaseButton(buttonId)
})

ipcMain.handle('joystick:setDPad', (_event, direction: number) => {
  joystick.setDPad(direction)
})

ipcMain.handle('joystick:startEmitting', () => {
  joystick.startEmitting((state) => {
    console.log('Emulating joystick state:', state)
  })
})

ipcMain.handle('joystick:stopEmitting', () => {
  joystick.stopEmitting()
})
