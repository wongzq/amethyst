import { config } from 'dotenv';

config();

const getEnvValue = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw Error(`env var not found for: ${key}`);
  }

  return value;
};

const getEnvValues = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw Error(`env var not found for: ${key}`);
  }

  const values = value.split(',').map((o) => o.trim());

  return values;
};

const Env = {
  DISCORD_APP_TOKEN: getEnvValue('DISCORD_APP_TOKEN'),

  ALLOWED_EMOJI_CHANNEL_IDS: getEnvValues('ALLOWED_EMOJI_CHANNEL_IDS'),

  ALLOWED_USER_IDS: getEnvValues('ALLOWED_USER_IDS'),
};

export default Env;
