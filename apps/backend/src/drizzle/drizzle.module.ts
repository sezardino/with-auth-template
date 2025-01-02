import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres/driver';
import { Pool } from 'pg';

import { DBSchema, dbSchema } from 'drizzle';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.get<string>('POSTGRES_URL'),
        });

        return drizzle(pool, { schema: dbSchema }) as DBSchema;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
