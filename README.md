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

## Install Application

```sh
# Clone repository
git clone https://github.com/miket-llc/jem.git

# Change into directory
cd jem

# Install dependencies
npm install

# Optional: test if the application is running
npm start
```jsonc

## Set Up Visual Studio Code and Start Debugging

1. Open the `jem` folder in Visual Studio Code.
2. Set a breakpoint in `src/main/main.ts` and `src/renderer/index.tsx`.
3. In the Run view, select the "Electron: All" configuration.

    This is a compound configuration that will start both the "Electron: Main" and "Electron: Renderer" configurations.

    ![Select configuration](./docs/media/select_configuration.png)

4. Click the green arrow next to the "Electron: All" configuration, or run the "Run" -> "Start Debugging" command (`F5`).
    - The breakpoint in `main.ts` will be hit.
    - Click Continue (`F5`).
    - In the Electron example app, interact with the joystick or controller to trigger the breakpoints in `index.tsx`.

## How Does It Work?

Electron has two kinds of processes: a main process and renderer processes (one for each tab). They need different launch configurations, which are shown below. The code snippets are taken from the [launch configuration](.vscode/launch.json).

### Main Process

The main process can be debugged with the node debugger that ships with Visual Studio Code. The launch configuration looks like this:

```jsonc
{
  "name": "Electron: Main",
  "type": "node",
  "request": "launch",
  "cwd": "${workspaceFolder}",
  "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
  "runtimeArgs": [
    "--remote-debugging-port=9223"
  ],
  "args": ["."],
  "outputCapture": "std",
  "sourceMaps": true,
  "resolveSourceMapLocations": [
    "${workspaceFolder}/**",
    "!**/node_modules/**"
  ],
  "preLaunchTask": "npm: compile"
}
```jsonc

### Renderer Process

A renderer process can be debugged with the Chrome debugger that ships with Visual Studio Code. The launch configuration looks like this:

```jsonc
{
  "name": "Electron: Renderer",
  "type": "chrome",
  "request": "attach",
  "port": 9223,
  "webRoot": "${workspaceFolder}/src/renderer",
  "timeout": 30000
}
```

### Compound Configuration

Visual Studio Code can only run a single configuration at a time, but we need to run the Main and the Renderer configurations at the same time. The solution is compound configurations (found in [vscode-recipes](https://github.com/Microsoft/vscode-recipes/tree/master/Electron)):

```jsonc
"compounds": [
  {
    "name": "Electron: All",
    "configurations": [
      "Electron: Main",
      "Electron: Renderer"
    ]
  }
]
```

### Source Maps

In the `sourceMaps` and `resolveSourceMapLocations` sections, we enable the creation of source maps for our code. Source maps must be generated to enable the debugger to map locations inside the JavaScript code back to TypeScript.

## Project Structure

```plaintext
project-root/
├── src/
│   ├── common/
│   │   └── logLevels.ts
│   ├── main/
│   │   ├── services/
│   │   │   └── logger.ts
│   │   └── main.ts
│   │   └── preload.ts
│   ├── renderer/
│   │   ├── services/
│   │   │   └── ipcService.ts
│   │   ├── index.tsx
│   │   └── renderer.html
├── build/
├── .vscode/
│   └── launch.json
├── package.json
├── tsconfig.json
└── webpack.config.js
```plaintext

## Using Cursor AI

Cursor AI can be used to enhance your development experience by providing intelligent code suggestions and assistance. Ensure you have Cursor AI installed and configured in your Visual Studio Code environment.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

## License

This project is licensed under the MIT License.
