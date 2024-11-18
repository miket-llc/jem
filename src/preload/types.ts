// src/preload/types.ts
export interface ElectronAPI {
  findDevices: () => Promise<Device[]>
  receiveInput: (deviceId: string) => Promise<string>
  connectToVirtualDevice: (deviceId: string) => Promise<void>
  writeOutput: (deviceId: string, output: string | Buffer) => Promise<void>
}

export interface Device {
  id: string
  name: string
}
