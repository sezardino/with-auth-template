import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid().defaultRandom().primaryKey().notNull(),
  login: text().unique().notNull(),
  password: text().notNull(),
});
