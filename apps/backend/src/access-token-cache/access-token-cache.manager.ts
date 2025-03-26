import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  AccessTokenInterface,
  TokenDataInterface,
  SetAccessTokenCacheInterface,
} from '@repo/interfaces';
import { tokenFormStringToNumberSecond } from '@repo/utils';
import { AuthInvalidAccessTokenException } from '@repo/exceptions';

export const AccessTokenCacheStore = 'accessToken';

@Injectable()
export class AccessTokenCacheManager {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async set(
    accessTokenData: AccessTokenInterface,
    cacheData: SetAccessTokenCacheInterface,
  ): Promise<TokenDataInterface | undefined> {
    return await this.cacheManager.set(
      `${AccessTokenCacheStore}:${accessTokenData.accessToken.replaceAll(' ', '')}`,
      { ...cacheData, accessTokenData: accessTokenData },
      tokenFormStringToNumberSecond(accessTokenData.expiresIn) * 1000,
    );
  }

  async get(accessToken: string): Promise<TokenDataInterface | undefined> {
    return (
      (await this.cacheManager.get(
        `${AccessTokenCacheStore}:${accessToken.replaceAll(' ', '')}`,
      )) ?? undefined
    );
  }

  async del(accessToken: string): Promise<boolean> {
    return await this.cacheManager.del(
      `${AccessTokenCacheStore}:${accessToken}`,
    );
  }

  async update(
    accessTokenData: AccessTokenInterface,
    cacheData: Partial<SetAccessTokenCacheInterface>,
  ): Promise<TokenDataInterface | undefined> {
    const prevCacheData = await this.get(accessTokenData.accessToken);
    if (!prevCacheData) {
      throw AuthInvalidAccessTokenException;
    }

    const newCacheData: TokenDataInterface = {
      ...prevCacheData,
      ...cacheData, // replace with the new data
    };

    return await this.cacheManager.set(
      `${AccessTokenCacheStore}:${accessTokenData.accessToken.replaceAll(' ', '')}`,
      newCacheData,
      tokenFormStringToNumberSecond(accessTokenData.expiresIn) * 1000,
    );
  }
}
