import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { type getScore } from "@/lib/api/score/queries";

import { nanoid, timestamps } from "@/lib/utils";


export const score = sqliteTable('score', {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  score: integer("score").notNull(),
  userId: text("user_id").notNull(),
  
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),

});


// Schema for score - used to validate API requests
const baseSchema = createSelectSchema(score).omit(timestamps)

export const insertScoreSchema = createInsertSchema(score).omit(timestamps);
export const insertScoreParams = baseSchema.extend({
  score: z.coerce.number()
}).omit({ 
  id: true,
  userId: true
});

export const updateScoreSchema = baseSchema;
export const updateScoreParams = baseSchema.extend({
  score: z.coerce.number()
}).omit({ 
  userId: true
});
export const scoreIdSchema = baseSchema.pick({ id: true });

// Types for score - used to type API request params and within Components
export type Score = typeof score.$inferSelect;
export type NewScore = z.infer<typeof insertScoreSchema>;
export type NewScoreParams = z.infer<typeof insertScoreParams>;
export type UpdateScoreParams = z.infer<typeof updateScoreParams>;
export type ScoreId = z.infer<typeof scoreIdSchema>["id"];
    
// this type infers the return from getScore() - meaning it will include any joins
export type CompleteScore = Awaited<ReturnType<typeof getScore>>["score"][number];

