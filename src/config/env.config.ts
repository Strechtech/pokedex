import { mongo } from "mongoose";
import { env } from "process";

export const envConfig = () => ({
  environment: env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  port: process.env.PORT || 3002,
  defaultLimit: process.env.DEFAULT_LIMIT || 5,
  
});