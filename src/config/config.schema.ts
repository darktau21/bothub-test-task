import * as Joi from 'joi';

export const configSchema = Joi.object({
  APP_PORT: Joi.number().port().required(),
  DATABASE_URL: Joi.string().uri().required(),
  DB_HOST: Joi.string().hostname().required(),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USER: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
});

export type ConfigSchema = {
  APP_PORT: number;
  DATABASE_URL: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USER: string;
  NODE_ENV: 'development' | 'production' | 'test';
};
