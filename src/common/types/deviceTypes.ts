export type DeviceInputReport = {
  deviceId: string
  usage: string // e.g., 'joystick', 'keyboard', 'mouse'
  reportId: string // e.g., 'buttonPress', 'axisMove'
  data: unknown // Specific data about the report, like button ID or axis value
}
