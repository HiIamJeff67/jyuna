import {
  NotificationChannelNamePrefix,
  NotificationChannelQuoteLength,
} from "@repo/constants";

export const getNotificationSubscriptionChannelName = function (
  userId: string
) {
  return (
    NotificationChannelNamePrefix +
    userId.substring(0, NotificationChannelQuoteLength)
  );
};
