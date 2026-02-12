import { Request, Response, NextFunction } from 'express';
import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import AppError from '@shared/error/AppError';

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
  password: process.env.REDIS_PASS || undefined,
});

redisClient.on('error', (err: any) => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 1,
});

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip || 'unknown');

    return next();
  } catch (error) {
    throw new AppError(' Too many requests', 429);
  }
}
