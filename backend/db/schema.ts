import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import pg from "pg";

const { Pool } = pg;

export const USERS = pgTable("Users", {
  id: serial().primaryKey().notNull(),
  email: text(),
  password: text(),
  tokenRsaPublicKey: text(),
});

const pool = new Pool({
  user: Deno.env.get("DB_USER"),
  host: Deno.env.get("DB_HOST"),
  database: Deno.env.get("DB_NAME"),
  password: Deno.env.get("DB_PASSWORD"),
  port: 5432,
});

export const db = drizzle(pool);
