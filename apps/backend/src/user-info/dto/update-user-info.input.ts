/* =============== Main Libraries =============== */
import { InputType, PartialType } from '@nestjs/graphql';
/* =============== Main Libraries =============== */

/* =============== Models =============== */
import { CreateUserInfoInput } from './create-user-info.input';
/* =============== Models =============== */

@InputType()
export class UpdateUserInfoInput extends PartialType(CreateUserInfoInput) {}
