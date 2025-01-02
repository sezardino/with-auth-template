import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres/driver';
import { Pool } from 'pg';

import { dbSchema } from 'drizzle';

export const DRIZZLE = Symbol('drizzle-connection');

export type DrizzleDBSchema = NodePgDatabase<typeof dbSchema>;

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.get<string>('POSTGRES_URL'),
        });

        return drizzle(pool, { schema: dbSchema }) as DrizzleDBSchema;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
