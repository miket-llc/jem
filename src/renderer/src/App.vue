<template>
  <div>
    <h1>Joystick Remapper</h1>
    <button @click="findDevices">Find Devices</button>
    <button @click="connectToVirtualDevice">Connect to Virtual Device</button>
    <button @click="writeOutput">Write Output</button>
    <div v-if="devices.length">
      <h2>Devices</h2>
      <ul>
        <li v-for="device in devices" :key="device.id">{{ device.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const devices = ref<Device[]>([])

const findDevices = async () => {
  devices.value = await window.electron.findDevices()
}

const connectToVirtualDevice = async () => {
  const deviceId = 'example-device-id' // Replace with actual device ID
  await window.electron.connectToVirtualDevice(deviceId)
}

const writeOutput = async () => {
  const deviceId = 'example-device-id' // Replace with actual device ID
  const output = {} // Replace with actual output data
  await window.electron.writeOutput(deviceId, output)
}

onMounted(() => {
  window.electron.receiveInput('example-device-id').then((input) => {
    console.log('Input received:', input)
  })
})
</script>
