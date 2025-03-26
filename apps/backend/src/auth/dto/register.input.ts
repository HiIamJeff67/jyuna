/* =============== Main Libraries =============== */
import { Field, InputType } from '@nestjs/graphql';
import {
  MinLength,
  MaxLength,
  IsEmail,
  IsStrongPassword,
  IsAlphanumeric,
} from 'class-validator';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import {
  MaxDisplayNameLength,
  MaxUserNameLength,
  MinDisplayNameLength,
  MinUserNameLength,
} from '@repo/constants';
/* =============== Shared Repositories =============== */

@InputType()
export class DefaultRegisterInput {
  @Field()
  @MinLength(MinUserNameLength)
  @MaxLength(MaxUserNameLength)
  @IsAlphanumeric()
  userName: string;

  @Field()
  @MinLength(MinDisplayNameLength)
  @MaxLength(MaxDisplayNameLength)
  displayName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  // should be greater than 8 characters,
  // contain english lower and upper case,
  // and at least an number and a sign
  @IsStrongPassword()
  password: string;
}
