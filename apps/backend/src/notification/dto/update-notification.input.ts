/* =============== Main Libraries =============== */
import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, ArrayUnique, IsArray } from 'class-validator';
/* =============== Main Libraries =============== */

@InputType()
export class UpdateNotificationInput {
  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  notificationIds: string[];
}
