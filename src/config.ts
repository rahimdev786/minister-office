import { LogLevel } from '@nestjs/common';
export const DEBUGLEVEL = process.env.MOI_LOG_LEVEL || 'debug';
export const debugLevel = ((): LogLevel[] => {
  if (DEBUGLEVEL === 'debug') return ['debug', 'warn', 'error'];
  if (DEBUGLEVEL === 'warn') return ['warn', 'error'];
  if (DEBUGLEVEL === 'error') return ['error'];
})();
