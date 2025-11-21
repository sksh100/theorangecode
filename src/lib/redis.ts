// src/lib/redis.ts

import { Redis } from "@upstash/redis";

// Don't throw during build time - only check at runtime
let redisInstance: Redis | null = null;

function getRedis(): Redis {
  if (!redisInstance) {
    const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
    
    if (!url || !token) {
      throw new Error("Redis not configured: Missing UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN or KV_REST_API_URL/KV_REST_API_TOKEN environment variables");
    }

    redisInstance = new Redis({
      url,
      token,
    });
  }

  return redisInstance;
}

// Export a getter that only initializes when accessed (not during build)
export const redis = {
  get ping() {
    return getRedis().ping.bind(getRedis());
  },
  get set() {
    return getRedis().set.bind(getRedis());
  },
  get get() {
    return getRedis().get.bind(getRedis());
  },
  get lpush() {
    return getRedis().lpush.bind(getRedis());
  },
  get ltrim() {
    return getRedis().ltrim.bind(getRedis());
  },
  get lrange() {
    return getRedis().lrange.bind(getRedis());
  },
  get keys() {
    return getRedis().keys.bind(getRedis());
  },
  get del() {
    return getRedis().del.bind(getRedis());
  },
  get exists() {
    return getRedis().exists.bind(getRedis());
  },
  get expire() {
    return getRedis().expire.bind(getRedis());
  },
  get ttl() {
    return getRedis().ttl.bind(getRedis());
  },
  get mget() {
    return getRedis().mget.bind(getRedis());
  },
} as Redis;
