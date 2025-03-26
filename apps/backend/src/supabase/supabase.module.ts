import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentSupabaseNotFoundException } from '@repo/exceptions';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASECLIENT = Symbol('supabase-client');

@Module({
  providers: [
    {
      provide: SUPABASECLIENT,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const supabaseUrl = configService.get<string>('SUPABASE_URL');
        const supabaseAPIKey = configService.get<string>('SUPABASE_API_KEY');
        if (!supabaseUrl || !supabaseAPIKey) {
          throw EnvironmentSupabaseNotFoundException;
        }
        return createClient(supabaseUrl, supabaseAPIKey) as SupabaseClient;
      },
    },
  ],
  exports: [SUPABASECLIENT],
})
export class SupabaseModule {}
