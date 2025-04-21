// import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
 
// export const sqlite = new Database('sqlite.db');
// export const db: BetterSQLite3Database = drizzle(sqlite);
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
export const db = drizzle(client, {
//   logger: true,
});