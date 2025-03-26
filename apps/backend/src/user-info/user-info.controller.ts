/* ============================== Main Libraries ============================== */
import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
/* ============================== Main Libraries ============================== */

/* ============================== Module Dependencies ============================== */
import { JwtAccessGuard, JwtAnyGuard, JwtRefreshGuard } from '../auth/guards';
import { UserInfoService } from './user-info.service';
/* ============================== Module Dependencies ============================== */

/* ============================== Others ============================== */
import { User } from '../auth/decorators';
/* ============================== Others ============================== */

/* ============================== Models ============================== */
import { AffectedCountOutput } from '../models';
/* ============================== Models ============================== */

/* ============================== Shared Repositories ============================== */
import { TokenDataInterface } from '@repo/interfaces';
/* ============================== Shared Repositories ============================== */

@Controller('user')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post('updateMyAvatar')
  @UseGuards(JwtAnyGuard([JwtAccessGuard, JwtRefreshGuard]))
  @UseInterceptors(FileInterceptor)
  async updateMyAvatar(
    @User() user: TokenDataInterface,
    @UploadedFile() avatarFile: Express.Multer.File,
  ): Promise<AffectedCountOutput> {
    try {
      const res = await this.userInfoService.updateAvatarByUserId(
        user.id,
        user.userName,
        avatarFile,
      );

      return {
        ...res,
        accessToken: user.accessTokenData.accessToken,
        expiresIn: user.accessTokenData.expiresIn,
      };
    } catch (error) {
      throw error;
    }
  }
}
