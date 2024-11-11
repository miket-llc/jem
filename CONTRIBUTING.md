# Contributing to JEM

Thank you for considering contributing to JEM! Here are some guidelines and tips to help you set up your development environment and contribute effectively.

## Development Tips

Setting up and debugging this project can be complex. Here are some tips and insights based on our experience:

### Understanding the Setup

1. **Electron and TypeScript Integration**:
   - Ensure that your `tsconfig.json` is correctly configured to include all necessary files.
   - Use `contextIsolation` and `preload` scripts to securely expose functionality to the renderer process.

2. **IPC Communication**:
   - Use IPC (Inter-Process Communication) to handle interactions between the main and renderer processes.
   - Define common types and constants in a shared module to ensure consistency.

3. **Logging**:
   - Centralize logging in the main process and use IPC to send log messages from the renderer process.
   - Use a logging library like `winston` for structured and configurable logging.

### Debugging Tips

1. **Visual Studio Code**:
   - Use the built-in debugger in Visual Studio Code to set breakpoints and step through your code.
   - Ensure source maps are correctly generated to map TypeScript code to the compiled JavaScript.

2. **Cursor AI**:
   - While Cursor AI can provide valuable suggestions, always validate and test the generated code.
   - Use Cursor AI as a tool to assist, but rely on your understanding and debugging skills to resolve complex issues.

3. **Common Pitfalls**:
   - Ensure all paths in your configuration files are correct.
   - Verify that all necessary dependencies are installed and up-to-date.
   - Pay attention to security settings like `contextIsolation` and avoid using deprecated options like `enableRemoteModule`.

### Example Configuration Files

#### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "module": "commonjs",
    "jsx": "react",
    "esModuleInterop": true,
    "sourceMap": true,
    "outDir": "./build",
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}
```

#### `launch.json`

```json
{
  "version": "0.2.0",
  "configurations": [
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
    },
    {
      "name": "Electron: Renderer",
      "type": "chrome",
      "request": "attach",
      "port": 9223,
      "webRoot": "${workspaceFolder}/src/renderer",
      "timeout": 30000
    }
  ],
  "compounds": [
    {
      "name": "Electron: All",
      "configurations": [
        "Electron: Main",
        "Electron: Renderer"
      ]
    }
  ]
}
```

By following these guidelines and tips, you can set up and debug the project more efficiently. If you have any questions or need further assistance, feel free to open an issue or reach out to the maintainers.
