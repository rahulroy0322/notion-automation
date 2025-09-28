import J from 'joi';

import { ENV_CONSTS, type ENVType } from '../constants/env.constants';

type EnvSchemaType = {
  NOTION_API_KEY: string;
  NOTION_DAILY_DB_KEY: string;
  NOTION_QUOTE_DB_KEY: string;
  PORT: number;
  ENV: ENVType;
};

const envSchema = J.object<EnvSchemaType, true, EnvSchemaType>({
  NOTION_API_KEY: J.string().trim().required(),
  NOTION_DAILY_DB_KEY: J.string().trim().required(),
  NOTION_QUOTE_DB_KEY: J.string().trim().required(),
  PORT: J.number().required(),
  ENV: J.string()
    .valid(...ENV_CONSTS)
    .required(),
  // .default('dev'),
}).required();

export { envSchema };
