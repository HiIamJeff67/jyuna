/* =============== Main Libraries =============== */
import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, ArrayUnique, IsArray } from 'class-validator';
/* =============== Main Libraries =============== */

@InputType()
export class DeleteNotificationInput {
  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  notificationIds: string[];
}
