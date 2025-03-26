/* =============== Main Libraries =============== */
import { Field, ObjectType } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
/* =============== Main Libraries =============== */

/* =============== Relative Models =============== */
import { AccessTokenDataModel } from '../../models';
/* =============== Relative Models =============== */

/* =============== Shared Repositories =============== */
import { LanguageEnum, ThemeEnum, TimeZoneEnum } from '@repo/enums';
import {
  LanguageType,
  LanguageValues,
  ThemeType,
  ThemeValues,
  TimeZoneType,
  TimeZoneValues,
} from '@repo/types';
/* =============== Shared Repositories =============== */

@ObjectType()
export class DefaultRegisterOutput extends AccessTokenDataModel {
  @Field(() => LanguageEnum)
  @IsIn(LanguageValues)
  language: LanguageType;

  @Field(() => TimeZoneEnum)
  @IsIn(TimeZoneValues)
  timeZone: TimeZoneType;

  @Field(() => ThemeEnum)
  @IsIn(ThemeValues)
  theme: ThemeType;
}
