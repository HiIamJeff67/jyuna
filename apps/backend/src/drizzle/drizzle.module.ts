import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import { EnvironmentSupabaseNotFoundException } from '@repo/exceptions';

export const DRIZZLE = Symbol('drizzle-connection');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const databaseUrl = configService.get('DATABASE_URL') as string;
        if (!databaseUrl) throw EnvironmentSupabaseNotFoundException;
        const pool = new Pool({
          connectionString: databaseUrl,
          ssl: { rejectUnauthorized: false },
        });
        return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
