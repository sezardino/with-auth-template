import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  login: text('login').unique().notNull(),
  name: text('name').notNull(),
  password: text('password').notNull(),
});
