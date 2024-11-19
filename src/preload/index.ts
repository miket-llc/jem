import { contextBridge /*, ipcRenderer*/ } from 'electron'

// Expose the methods to the renderer process

contextBridge.exposeInMainWorld('electron', {
  process: {
    versions: process.versions
  }
})
