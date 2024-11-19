import { PlatformDeviceService } from './PlatformDeviceService'
import { IDeviceInputService } from '../../common/interfaces/deviceInputServiceAPI'
import { DeviceInputReport } from '../../common/types/deviceTypes'
import { EventEmitter } from 'events'
import { IpcMain } from 'electron'

// Example of a SyntheticDeviceService to simulate device behavior
export class SyntheticDeviceService extends EventEmitter {
  private simulatedDevices: Set<string>

  constructor() {
    super()
    this.simulatedDevices = new Set()
  }

  public addDevice(deviceId: string): void {
    this.simulatedDevices.add(deviceId)
    console.log(`Simulated device added: ${deviceId}`)
  }

  public removeDevice(deviceId: string): void {
    this.simulatedDevices.delete(deviceId)
    console.log(`Simulated device removed: ${deviceId}`)
  }

  public generateInputReport(deviceId: string, report: DeviceInputReport): void {
    if (this.simulatedDevices.has(deviceId)) {
      this.emit('inputReport', report)
    }
  }
}


export class DeviceInputService implements IDeviceInputService {
  private platformDeviceService: PlatformDeviceService
  private syntheticDeviceService: SyntheticDeviceService
  private eventEmitter: EventEmitter

  constructor(platform: 'linux' | 'macos' | 'windows') {
    // Use platform-specific device input handling
    this.platformDeviceService = new PlatformDeviceService(platform)
    this.syntheticDeviceService = new SyntheticDeviceService()
    this.eventEmitter = new EventEmitter()

    // Set up listeners for platform input reports
    this.platformDeviceService.on('inputReport', (report: DeviceInputReport) => {
      this.handleInputReport(report)
    })

    // Set up listeners for synthetic input reports
    this.syntheticDeviceService.on('inputReport', (report: DeviceInputReport) => {
      this.handleInputReport(report)
    })
  }

  // Unified handler for platform and synthetic input reports
  private handleInputReport(report: DeviceInputReport) {
    console.log(`Received input report from device ${report.deviceId}:`, report)
    this.eventEmitter.emit('inputReport', report)
  }

  // Allow other parts of the system to listen for input reports
  public on(event: 'inputReport', listener: (report: DeviceInputReport) => void): void {
    this.eventEmitter.on(event, listener)
  }

  // Method to add a simulated device
  public addSimulatedDevice(deviceId: string): void {
    this.syntheticDeviceService.addDevice(deviceId)
  }

  // Method to remove a simulated device
  public removeSimulatedDevice(deviceId: string): void {
    this.syntheticDeviceService.removeDevice(deviceId)
  }

  // Expose API to the renderer process via IPC
  public exposeAPI(ipc: IpcMain): void {
    ipc.handle('deviceInput:onInputReport', (event, listenerId) => {
      this.on('inputReport', (report) => {
        event.sender.send(`deviceInput:inputReport:${listenerId}`, report)
      })
    })

    ipc.handle('deviceInput:addSimulatedDevice', (_, deviceId) => {
      this.addSimulatedDevice(deviceId)
    })

    ipc.handle('deviceInput:removeSimulatedDevice', (_, deviceId) => {
      this.removeSimulatedDevice(deviceId)
    })
  }
}
