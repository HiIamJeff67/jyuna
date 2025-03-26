import { Field, ObjectType } from '@nestjs/graphql';
import { Matches } from 'class-validator';
import { TokenExpireTimeRegex } from '@repo/regexs';

@ObjectType()
export class AccessTokenDataModel {
  @Field()
  accessToken: string;

  @Field()
  @Matches(TokenExpireTimeRegex)
  expiresIn: string;
}
