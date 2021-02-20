import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || '3000',
  env: process.env.NODE_ENV || 'development',
  connection: {
    uri: process.env.MONGODB_URI || ''
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    lifetime: process.env.JWT_LIFE_TIME || '7d'
  },
  workers: process.env.WORKERS || '1',
  logs: {
    path: process.env.LOGS_PATH || 'var/logs',
  },
};
