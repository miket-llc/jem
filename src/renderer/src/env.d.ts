/// <reference types="vite/client" />

import { ElectronAPI } from '../preload/types'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  interface Window {
    electron: ElectronAPI
  }

  interface Device {
    id: string
    name: string
  }
}
