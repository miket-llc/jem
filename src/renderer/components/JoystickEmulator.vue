<template>
  <div>
    <h1>Synthetic Joystick Emulator</h1>
    <div>
      <label>X-Axis: </label>
      <input
        v-model="axes.x"
        type="range"
        min="-1"
        max="1"
        step="0.1"
        @input="updateAxis('x', axes.x)"
      />
    </div>
    <div>
      <label>Y-Axis: </label>
      <input
        v-model="axes.y"
        type="range"
        min="-1"
        max="1"
        step="0.1"
        @input="updateAxis('y', axes.y)"
      />
    </div>
    <div>
      <label>Button 0: </label>
      <input v-model="buttons[0]" type="checkbox" @change="toggleButton(0)" />
    </div>
    <div>
      <label>Button 1: </label>
      <input v-model="buttons[1]" type="checkbox" @change="toggleButton(1)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const axes = ref({ x: 0, y: 0 })
const buttons = ref([false, false])

const updateAxis = (axis: 'x' | 'y', value: number) => {
  window.joystick.setAxis(axis, value)
}

const toggleButton = (buttonId: number) => {
  if (buttons.value[buttonId]) {
    window.joystick.pressButton(buttonId)
  } else {
    window.joystick.releaseButton(buttonId)
  }
}

window.joystick.startEmitting()
</script>
