/* =============== Main Libraries =============== */
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { AccessTokenCacheManager } from '../access-token-cache/access-token-cache.manager';
/* =============== Module Dependencies =============== */

/* =============== Models =============== */
import { UserAccount } from './models/user-account.model';
import { UpdateAccountInput } from './dto/update-user-account.input';
import { AffectedCountModel } from '../models';
/* =============== Models =============== */

/* =============== Shared Repositories =============== */
import {
  CacheUpdateAccessTokenException,
  UserNotFoundException,
} from '@repo/exceptions';
import { AccessTokenInterface } from '@repo/interfaces';
/* =============== Shared Repositories =============== */

/* =============== Database Schema =============== */
import { UserTable } from '../drizzle/schema/user.schema';
/* =============== Database Schema =============== */

@Injectable()
export class UserAccountService {
  constructor(
    private readonly accessTokenCacheManager: AccessTokenCacheManager,
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
  ) {}

  async updateOneByUserId(
    userId: string,
    accessTokenData: AccessTokenInterface,
    input: UpdateAccountInput,
  ): Promise<AffectedCountModel> {
    return await this.db.transaction(async (tx) => {
      const responseOfUpdatingUserAccount = (await tx
        .update(UserTable)
        .set({
          role: input.role,
          plan: input.plan,
        })
        .where(eq(UserTable.id, userId))
        .returning({
          userName: UserTable.userName,
          email: UserTable.email,
          role: UserTable.role,
          plan: UserTable.plan,
          userAgent: UserTable.userAgent,
        })) as UserAccount[] | undefined;

      if (
        !responseOfUpdatingUserAccount ||
        responseOfUpdatingUserAccount.length !== 1
      ) {
        throw UserNotFoundException;
      }

      const responseOfUpdatingCachce =
        await this.accessTokenCacheManager.update(accessTokenData, {
          role: responseOfUpdatingUserAccount[0].role,
          plan: responseOfUpdatingUserAccount[0].plan,
        });
      if (!responseOfUpdatingCachce) {
        tx.rollback();
        throw CacheUpdateAccessTokenException;
      }

      return {
        totCount: 1,
        successCount: responseOfUpdatingUserAccount.length,
      };
    });
  }
}
