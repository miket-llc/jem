// src/preload/index.d.ts
import { ElectronAPI } from '../common/types/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
