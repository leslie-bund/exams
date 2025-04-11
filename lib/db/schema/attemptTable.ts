import { sql } from "drizzle-orm";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getAttemptTables } from "@/lib/api/attemptTable/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const attemptTable = sqliteTable('attempt_table', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  challengeCode: text("challenge_code").notNull(),
  challengeList: text("challenge_list").notNull(),
  userId: text("user_id").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for attemptTable - used to validate API requests
const baseSchema = createSelectSchema(attemptTable).omit(timestamps)

export const insertAttemptTableSchema = createInsertSchema(attemptTable).omit(timestamps);
export const insertAttemptTableParams = baseSchema.extend({}).omit({ 
  id: true,
  userId: true
});

export const updateAttemptTableSchema = baseSchema;
export const updateAttemptTableParams = baseSchema.extend({}).omit({ 
  userId: true
});
export const attemptTableIdSchema = baseSchema.pick({ id: true });

// Types for attemptTable - used to type API request params and within Components
export type AttemptTable = typeof attemptTable.$inferSelect;
export type NewAttemptTable = z.infer<typeof insertAttemptTableSchema>;
export type NewAttemptTableParams = z.infer<typeof insertAttemptTableParams>;
export type UpdateAttemptTableParams = z.infer<typeof updateAttemptTableParams>;
export type AttemptTableId = z.infer<typeof attemptTableIdSchema>["id"];
    
// this type infers the return from getAttemptTable() - meaning it will include any joins
export type CompleteAttemptTable = Awaited<ReturnType<typeof getAttemptTables>>["attemptTable"][number];

