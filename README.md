# JEM: Joystick and Controller Enhanced Mapping

JEM (Joystick and Controller Enhanced Mapping) is an advanced tool designed to provide comprehensive mapping and customization for virtual controllers. It aims to replace existing applications by offering a more robust and flexible solution for joystick and controller enthusiasts. JEM allows users to create complex mappings, macros, and profiles for their controllers, enhancing their gaming and simulation experiences.

## Features

- Advanced joystick and controller mapping
- Customizable macros and profiles
- Support for multiple controllers
- Real-time feedback and adjustments
- User-friendly interface

## Prerequisites

Ensure you have the following installed on your development machine:

- Node.js (v22.5.1 or later)
- npm (comes with Node.js)
- Electron (v31.3.1 or later)
- TypeScript (v5.5.4 or later)
- Visual Studio Code (v1.92.0 or later)
- Cursor AI (for enhanced code assistance)

## Installation

### Clone the Repository

```sh
git clone https://github.com/miket-llc/jem.git
```

### Change into directory

```sh
cd jem
```

### Install dependencies

```sh
npm install
```

### Optional: test if the application is running

```sh
npm start
```

## Development Setup

1. Open the `jem` folder in Visual Studio Code.
2. Set breakpoints in `src/main/main.ts` and `src/renderer/index.tsx` as needed.
3. Select the "Electron: All" configuration in the Run view to start both the main and renderer processes.

   ![Select configuration](./docs/media/select_configuration.png)

4. Click the green arrow next to the "Electron: All" configuration, or use the "Run" -> "Start Debugging" command (`F5`).

## Technology Stack

This application utilizes Electron, TypeScript, and Vue with Vite for a modern development experience.

- Electron for cross-platform desktop app capabilities.
- TypeScript for type-safe code.
- Vue for a progressive JavaScript framework.
- Vite for fast and lean development builds.

## Additional Features

- Optimize asset handling
- Fast HMR (Hot Module Replacement) for renderer processes
- Hot reloading for main process and preload scripts
- Easy debugging setup
- Compile to V8 bytecode for source code protection

## Documentation

For more detailed information on configuration and development practices, visit:

- [Configuration](https://electron-vite.org/config/)
- [Development](https://electron-vite.org/guide/dev.html)
- [Asset Handling](https://electron-vite.org/guide/assets.html)
- [HMR and Hot Reloading](https://electron-vite.org/guide/hmr.html)
- [Debugging](https://electron-vite.org/guide/debugging.html)
- [Source Code Protection](https://electron-vite.org/guide/source-code-protection.html)

## Project Setup

```bash
npm install
```
