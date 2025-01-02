import { NodePgDatabase } from 'drizzle-orm/node-postgres/driver';
import * as dbSchema from './schema';

export * as dbSchema from './schema';

export type DBSchema = NodePgDatabase<typeof dbSchema>;
