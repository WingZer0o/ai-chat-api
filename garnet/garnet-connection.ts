/**
 * Microsoft Garnet provides a fully functioning Redis client implementation
 */

import { Redis } from "ioredis";

const redisConnection = new Redis({
    host: "garnet",
});

export default redisConnection;
