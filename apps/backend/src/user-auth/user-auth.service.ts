/* =============== Main Libraries =============== */
import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
/* =============== Main Libraries =============== */

/* =============== Module Dependencies =============== */
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { UserAuthTable } from '../drizzle/schema/userAuth.schema';
/* =============== Module Dependencies =============== */

/* =============== Models =============== */
import { UserAuth } from './models/user-auth.model';
/* =============== Models =============== */

/* =============== Shared Repositories =============== */
import { UserNotFoundException } from '@repo/exceptions';
/* =============== Shared Repositories =============== */

@Injectable()
export class UserAuthService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  /* ============================== Get Operations ============================== */
  async getMyAuth(userId: string): Promise<UserAuth> {
    const response = (await this.db.query.UserAuthTable.findFirst({
      where: eq(UserAuthTable.userId, userId),
      columns: {
        phoneNumber: true,
        discordId: true,
        googleId: true,
        spotifyId: true,
        twitchId: true,
        metaId: true,
        redditId: true,
        lineId: true,
        updatedAt: true,
      },
    })) as UserAuth | undefined;
    if (!response) {
      throw UserNotFoundException;
    }

    return response;
  }
  /* ============================== Get Operations ============================== */

  /* ============================== Update Operations ============================== */
  /* ============================== Update Operations ============================== */
}
