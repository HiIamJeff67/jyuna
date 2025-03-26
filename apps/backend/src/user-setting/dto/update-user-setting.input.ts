/* =============== Main Libraries =============== */
import { InputType, PartialType } from '@nestjs/graphql';
/* =============== Main Libraries =============== */

/* =============== Models =============== */
import { CreateUserSettingInput } from './create-user-setting.input';
/* =============== Models =============== */

@InputType()
export class UpdateUserSettingInput extends PartialType(
  CreateUserSettingInput,
) {}
