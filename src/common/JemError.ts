// src/common/JemError.ts
export class JemError extends Error {
    constructor(public message: string, public code?: string) {
      super(message);
      this.name = 'JemError';
      if (code) {
        this.code = code;
      }
    }
  }
  