/* =============== Main Libraries =============== */
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn } from 'class-validator';
/* =============== Main Libraries =============== */

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

@InputType()
export class CreateUserSettingInput {
  @Field(() => LanguageEnum)
  @IsIn(LanguageValues)
  language: LanguageType;

  @Field(() => TimeZoneEnum)
  @IsIn(TimeZoneValues)
  timeZone: TimeZoneType;

  @Field(() => ThemeEnum)
  @IsIn(ThemeValues)
  theme: ThemeType;

  @Field(() => Int)
  generalSettingsCode: number;

  @Field(() => Int)
  privacySettingsCode: number;
}
