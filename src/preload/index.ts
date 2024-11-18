import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, JoystickAPI } from '../preload/types'

// Expose the methods to the renderer process
const electronAPI: ElectronAPI = {
  findDevices: () => ipcRenderer.invoke('find-devices'),
  receiveInput: (deviceId: string) => ipcRenderer.invoke('receive-input', deviceId),
  connectToVirtualDevice: (deviceId: string) =>
    ipcRenderer.invoke('connect-to-virtual-device', deviceId),
  writeOutput: (deviceId: string, output: string | Buffer) =>
    ipcRenderer.invoke('write-output', deviceId, output)
}

const joystickAPI: JoystickAPI = {
  setAxis: (axis: 'x' | 'y' | 'z', value: number) =>
    ipcRenderer.invoke('joystick:setAxis', axis, value),
  pressButton: (buttonId: number) => ipcRenderer.invoke('joystick:pressButton', buttonId),
  releaseButton: (buttonId: number) => ipcRenderer.invoke('joystick:releaseButton', buttonId),
  setDPad: (direction: number) => ipcRenderer.invoke('joystick:setDPad', direction),
  startEmitting: () => ipcRenderer.invoke('joystick:startEmitting'),
  stopEmitting: () => ipcRenderer.invoke('joystick:stopEmitting')
}

contextBridge.exposeInMainWorld('electron', {
  ...electronAPI,
  process: {
    versions: process.versions
  }
})

contextBridge.exposeInMainWorld('joystick', joystickAPI)
