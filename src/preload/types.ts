export interface ElectronAPI {
  findDevices: () => Promise<Device[]>
  receiveInput: (deviceId: string) => Promise<string>
  connectToVirtualDevice: (deviceId: string) => Promise<void>
  writeOutput: (deviceId: string, output: string | Buffer) => Promise<void>
}

export interface JoystickAPI {
  setAxis: (axis: 'x' | 'y' | 'z', value: number) => void
  pressButton: (buttonId: number) => void
  releaseButton: (buttonId: number) => void
  setDPad: (direction: number) => void
  startEmitting: () => void
  stopEmitting: () => void
}

export interface Device {
  id: string
  name: string
}

export interface JoystickState {
  axes: {
    x: number // -1 to 1
    y: number // -1 to 1
    z?: number // Optional Z-axis
  }
  buttons: {
    [key: number]: boolean // Button ID to pressed state
  }
  dpad?: number // -1 for no direction, 0-7 for directions
}
