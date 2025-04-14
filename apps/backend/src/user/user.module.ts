import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { AccessTokenCacheModule } from '../access-token-cache/access-token-cache.module';

@Module({
  imports: [DrizzleModule, AccessTokenCacheModule],
  providers: [UserResolver, UserService],
})
export class UserModule {}
