import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const metrics = pgTable("metrics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  selfAwareness: integer("self_awareness").notNull(),
  resilience: integer("resilience").notNull(),
  adaptiveCapacity: integer("adaptive_capacity").notNull(),
  decisionMaking: integer("decision_making").notNull(),
  emotionalRegulation: integer("emotional_regulation").notNull(),
  date: timestamp("date").notNull(),
});

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  progress: integer("progress").notNull(),
  category: text("category").notNull(),
});

export const journalEntries = pgTable("journal_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title"),
  content: text("content").notNull(),
  date: timestamp("date").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMetricsSchema = createInsertSchema(metrics).omit({
  id: true,
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
});

export const insertJournalEntrySchema = createInsertSchema(journalEntries).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Metrics = typeof metrics.$inferSelect;
export type Goal = typeof goals.$inferSelect;
export type JournalEntry = typeof journalEntries.$inferSelect;
