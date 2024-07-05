import * as Joi from 'joi';

export const configSchema = Joi.object({
  APP_PORT: Joi.number().port().required(),
  DATABASE_URL: Joi.string().uri().required(),
  DB_HOST: Joi.string().hostname().required(),
  DB_NAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USER: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.number().integer().required(),
  JWT_SECRET: Joi.string().min(10).required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  REDIS_DB: Joi.number().integer().required(),
  REDIS_HOST: Joi.string().hostname().required(),
  REDIS_PASSWORD: Joi.string().required(),
  REDIS_PORT: Joi.number().port().required(),
  REFRESH_TOKEN_EXPIRATION_TIME: Joi.number().integer().required(),
  SMTP_FROM: Joi.string().email().required(),
  SMTP_FROM_NAME: Joi.string().required(),
  SMTP_HOST: Joi.string().hostname().required(),
  SMTP_PASSWORD: Joi.string().required(),
  SMTP_PORT: Joi.number().port().required(),
  SMTP_USER: Joi.string().required(),
  VERIFY_LINK: Joi.string().uri().required(),
});

export type ConfigSchema = {
  APP_PORT: number;
  DATABASE_URL: string;
  DB_HOST: string;
  DB_NAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_USER: string;
  JWT_EXPIRATION_TIME: number;
  JWT_SECRET: string;
  NODE_ENV: 'development' | 'production' | 'test';
  REDIS_DB: number;
  REDIS_HOST: string;
  REDIS_PASSWORD: string;
  REDIS_PORT: number;
  REFRESH_TOKEN_EXPIRATION_TIME: number;
  SMTP_FROM: string;
  SMTP_FROM_NAME: string;
  SMTP_HOST: string;
  SMTP_PASSWORD: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  VERIFY_LINK: string;
};
