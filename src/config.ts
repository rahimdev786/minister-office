import { LogLevel } from '@nestjs/common';

// Environmental Variable
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || '3800';
// export const MONGODB_URI =
//   process.env.MONGO_URI || 'mongodb://10.10.1.200:28017/minister_office';
  export const MONGODB_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/minister_office';
// Debug
export const DEBUGLEVEL = process.env.MOI_LOG_LEVEL || 'debug';
export const debugLevel = ((): LogLevel[] => {
  if (DEBUGLEVEL === 'debug') return ['debug', 'warn', 'error'];
  if (DEBUGLEVEL === 'warn') return ['warn', 'error'];
  if (DEBUGLEVEL === 'error') return ['error'];
})();
