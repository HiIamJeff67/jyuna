/* =============== Main Libraries =============== */
import { IsNotEmpty, IsString } from 'class-validator';
/* =============== Main Libraries =============== */

/* =============== Models =============== */
import { Notification } from '../models/notification.model';
/* =============== Models =============== */

export class SubscribeNotificationDto extends Notification {
  @IsNotEmpty()
  @IsString()
  receiverSocketId: string;
}
