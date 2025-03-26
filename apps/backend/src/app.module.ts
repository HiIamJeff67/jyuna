import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AccessTokenCacheModule } from './access-token-cache/access-token-cache.module';
import { CookieModule } from './cookie/cookie.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SupabaseStorageModule } from './supabase-storage/supabase-storage.module';
import { SecureGeneratorModule } from './secret-generator/secret-generator.module';
import { AuthModule } from './auth/auth.module';
import { UserInfoModule } from './user-info/user-info.module';
import { UserAccountModule } from './user-account/user-account.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { UsersToUsersModule } from './users-to-users/users-to-users.module';
import { UserSettingModule } from './user-setting/user-setting.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        port: Number(process.env.MAILER_PORT),
        secure: true,
        auth: {
          user: process.env.GOOGLE_EMAIL,
          pass: process.env.GOOGLE_PASSWORD,
        },
      },
      template: {
        dir: join(__dirname, 'email/templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        '../../packages/generated/src/schema.gql',
      ),
      sortSchema: true,
      context: ({ req, res }) => ({ req, res }),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    DrizzleModule,
    CookieModule,
    SecureGeneratorModule,
    AccessTokenCacheModule,
    EmailModule,
    CookieModule,
    SupabaseModule,
    SupabaseStorageModule,
    AuthModule,
    UserInfoModule,
    UserAccountModule,
    UserAuthModule,
    UsersToUsersModule,
    UserSettingModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
