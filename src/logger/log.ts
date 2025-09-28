import pino from 'pino';
import PinoPretty from 'pino-pretty';

import { IS_DEBUG, IS_DEV } from '../config/env.config';

const logger = pino(
  PinoPretty({
    colorize: true,
    minimumLevel: IS_DEBUG ? 'trace' : IS_DEV ? 'info' : 'warn',
  })
);
const { trace, debug, info, warn, error, fatal } = logger;

export { trace, debug, info, warn, error, fatal, logger };

export default logger;
