export const logLevels = {
    error: 'error',
    warn: 'warn',
    info: 'info',
    http: 'http',
    verbose: 'verbose',
    debug: 'debug',
    silly: 'silly'
  } as const;
  
  export type LogLevel = typeof logLevels[keyof typeof logLevels];