import { getSiteURL } from './lib/get-site-url';
import { LogLevel } from './lib/logger';
export const config = {
  site: {
    name: 'Shabby',
    description: '',
    themeColor: '#090a0b',
    url: getSiteURL()
  },
  logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL ?? LogLevel.ALL
};