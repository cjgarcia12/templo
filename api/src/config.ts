import dotenv from 'dotenv-safe';

export default () => {
  dotenv.config({
    example: './.env.example'
  });

  return {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: Number(process.env.PORT) || 3001,

    MONGODB_URI: process.env.MONGODB_URI as string,

    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY as string,
    YOUTUBE_CHANNEL_ID: process.env.YOUTUBE_CHANNEL_ID as string,
    GOOGLE_CALENDAR_ID: process.env.GOOGLE_CALENDAR_ID as string,

    API_SECRET_KEY: process.env.API_SECRET_KEY as string,
    JWT_SECRET: process.env.JWT_SECRET as string,

    FRONTEND_URL: process.env.FRONTEND_URL as string || 'http://localhost:3000',

    RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
    RATE_LIMIT_MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  };
};
