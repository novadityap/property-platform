import dotenv from 'dotenv';

const envPath = process.env.NODE_ENV === 'test' ? '.env.testing' : '.env.development';
dotenv.config({ path: envPath });

import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, '0.0.0.0', () => {
  const message = `Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`;
  logger.info(message);
});

server.on('error', (err) => {
  console.error('CRITICAL SERVER ERROR:', err);
  process.exit(1);
});