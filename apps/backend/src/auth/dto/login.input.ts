/* =============== Main Libraries =============== */
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsStrongPassword } from 'class-validator';
/* =============== Main Libraries =============== */

@InputType()
export class DefaultLoginInput {
  @Field()
  account: string;

  @Field()
  @IsStrongPassword()
  password: string;
}
