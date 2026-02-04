// This file represents the backend schema design using Drizzle ORM
// as requested. In this SPA, it serves as a reference for the data structure.

import { pgTable, serial, text, timestamp, varchar, jsonb, uuid, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(), // Markdown storage
  category: varchar('category', { length: 50 }).notNull(), // 'Universe Secrets', etc.
  imageUrl: text('image_url'),
  watcherInsight: text('watcher_insight'), // The special AI commentary
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const tarotReadings = pgTable('tarot_readings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  question: text('question'),
  cardsDrawn: jsonb('cards_drawn').notNull(), // Array of card objects
  interpretation: text('interpretation').notNull(), // AI Generated text
  theme: varchar('theme', { length: 50 }), // e.g., 'Love', 'Career', 'Destiny'
  createdAt: timestamp('created_at').defaultNow(),
});

export const chatSessions = pgTable('chat_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id),
  topic: text('topic'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const chatMessages = pgTable('chat_messages', {
  id: serial('id').primaryKey(),
  sessionId: uuid('session_id').references(() => chatSessions.id),
  role: varchar('role', { length: 10 }).notNull(), // 'user' or 'model'
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});