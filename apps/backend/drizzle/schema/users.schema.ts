import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { profiles } from './profile.schema';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  login: text('login').unique().notNull(),
  password: text('password').notNull(),
});

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.id],
  }),
}));
