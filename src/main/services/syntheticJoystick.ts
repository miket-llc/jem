import { JoystickState } from '../../preload/types'

export class SyntheticJoystick {
  private state: JoystickState
  private intervalId: NodeJS.Timeout | null = null

  constructor() {
    // Initialize joystick state
    this.state = {
      axes: { x: 0, y: 0 },
      buttons: {},
      dpad: -1 // No direction
    }
  }

  // Update joystick state programmatically
  setAxis(axis: 'x' | 'y' | 'z', value: number) {
    this.state.axes[axis] = Math.max(-1, Math.min(1, value)) // Clamp to -1 to 1
  }

  pressButton(buttonId: number) {
    this.state.buttons[buttonId] = true
  }

  releaseButton(buttonId: number) {
    this.state.buttons[buttonId] = false
  }

  setDPad(direction: number) {
    this.state.dpad = direction // 0-7 for directions, -1 for none
  }

  // Emit synthetic joystick events at regular intervals
  startEmitting(callback: (state: JoystickState) => void, interval: number = 16) {
    if (this.intervalId) return // Already emitting
    this.intervalId = setInterval(() => {
      callback(this.state)
    }, interval)
  }

  stopEmitting() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
