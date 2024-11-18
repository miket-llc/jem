// src/preload/index.d.ts
import { ElectronAPI } from './types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
