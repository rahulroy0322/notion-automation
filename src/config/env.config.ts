import 'dotenv/config';

import { envSchema } from '../schema/env.schema';

const {
  error,
  warning,
  value: ENV,
} = envSchema.validate(process.env, {
  stripUnknown: true,
  allowUnknown: false,
  abortEarly: false,
});
if (warning) {
  console.warn(warning, 'warning in env validation');
}
if (error) {
  console.error(error, 'error in env validation');
  process.exit(1);
}

const IS_DEV = ENV.ENV === 'dev';
const IS_DEBUG = ENV.ENV === 'debug';

export { ENV, IS_DEBUG, IS_DEV };
