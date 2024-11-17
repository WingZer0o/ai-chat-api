import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import pg from "pg";

const { Pool } = pg;

export const USERS = pgTable("Users", {
  id: serial().primaryKey().notNull(),
  email: text(),
  password: text(),
  tokenRsaPublicKey: text(),
});

export const CHAT_CHANNELS = pgTable("ChatChannels", {
  id: serial().primaryKey().notNull(),
  userId: integer()
    .notNull()
    .references(() => USERS.id, { onDelete: "cascade" }),
  channelName: text().notNull(),
  createdAt: integer()
    .notNull()
    .default(sql`extract(epoch from now())`),
  modifiedAt: integer()
    .notNull()
    .default(sql`extract(epoch from now())`),
});

const pool = new Pool({
  user: Deno.env.get("DB_USER"),
  host: Deno.env.get("DB_HOST"),
  database: Deno.env.get("DB_NAME"),
  password: Deno.env.get("DB_PASSWORD"),
  port: 5432,
});

export const db = drizzle(pool);
