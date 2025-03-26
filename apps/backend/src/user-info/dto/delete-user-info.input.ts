/* =============== Main Libraries =============== */
import { Field, InputType } from '@nestjs/graphql';
/* =============== Main Libraries =============== */

@InputType()
export class DeleteAccountInput {
  @Field()
  password: string;
}
