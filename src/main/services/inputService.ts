// src/main/services/inputService.ts
import { platform } from 'os'

// Platform-specific imports
import * as windowsInput from './platforms/windowsInput'
import * as macosInput from './platforms/macosInput'
import * as linuxInput from './platforms/linuxInput'

export class InputService {
  private platformService: typeof windowsInput | typeof macosInput | typeof linuxInput

  constructor() {
    switch (platform()) {
      case 'win32':
        this.platformService = windowsInput
        break
      case 'darwin':
        this.platformService = macosInput
        break
      case 'linux':
        this.platformService = linuxInput
        break
      default:
        throw new Error('Unsupported platform')
    }
  }

  findDevices() {
    return this.platformService.findDevices()
  }

  receiveInput(deviceId: string, callback: (input: unknown) => void) {
    this.platformService.receiveInput(deviceId, callback)
  }

  connectToVirtualDevice(deviceId: string) {
    return this.platformService.connectToVirtualDevice(deviceId)
  }

  writeOutput(deviceId: string, output: string) {
    this.platformService.writeOutput(deviceId, output)
  }
}
