import app from './app';
import { PORT } from './config/app.config';
import logger from './logger/log';

const server = app.listen(PORT, () => {
  logger.info(`app is running on port : ${PORT}`);
});

server.on('close', () => {
  process.exit(0);
});

const exit = () => {
  server.closeIdleConnections();
  server.closeAllConnections();
  server.close();
};

process.on('SIGTERM', exit);
