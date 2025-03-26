/* =============== Main Libraries =============== */
import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsIn } from 'class-validator';
/* =============== Main Libraries =============== */

/* =============== Shared Repositories =============== */
import { NotificationEnum } from '@repo/enums';
import { NotificationType, NotificationValues } from '@repo/types';
/* =============== Shared Repositories =============== */

@InputType()
export class CreateNotificationInput {
  @Field(() => [String])
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  to: string[];

  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => NotificationEnum, { nullable: true })
  @IsIn(NotificationValues)
  type?: NotificationType;

  @Field(() => String, { nullable: true })
  linkId?: string;
}
