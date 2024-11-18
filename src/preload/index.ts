import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI } from './types'

// Expose the methods to the renderer process
const electronAPI: ElectronAPI = {
  findDevices: () => ipcRenderer.invoke('find-devices'),
  receiveInput: (deviceId: string) => ipcRenderer.invoke('receive-input', deviceId),
  connectToVirtualDevice: (deviceId: string) =>
    ipcRenderer.invoke('connect-to-virtual-device', deviceId),
  writeOutput: (deviceId: string, output: string | Buffer) =>
    ipcRenderer.invoke('write-output', deviceId, output)
}

contextBridge.exposeInMainWorld('electron', electronAPI)
