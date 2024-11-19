import { DeviceInputReport } from '../../common/types/deviceTypes'

export interface IDeviceInputService {
  on(event: 'inputReport', listener: (report: DeviceInputReport) => void): void
  addSimulatedDevice(deviceId: string): void
  removeSimulatedDevice(deviceId: string): void
}