import { Redis } from "@upstash/redis";

// Create a conditional Redis client that handles missing env vars gracefully
const createRedisClient = () => {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    // Return a mock client that doesn't throw errors and supports generics
    return {
      get: async <T = any>(): Promise<T | null> => null,
      set: async (_key: string, _value: string): Promise<string> => "OK",
      lpush: async (): Promise<number> => 0,
      ltrim: async (): Promise<string> => "OK",
      lrange: async <T = string>(): Promise<T[]> => [],
      zadd: async (): Promise<number> => 0,
      zrange: async <T = string>(): Promise<T[]> => [],
      zremrangebyscore: async (): Promise<number> => 0,
      incr: async (): Promise<number> => 0,
      incrbyfloat: async (): Promise<number> => 0,
    } as any;
  }
  
  return new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });
};

export const redis = createRedisClient();

