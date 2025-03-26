import { PrivacySettingsCodeInterface } from "@repo/interfaces";
import { PrivacySettingsType } from "@repo/types";

export const PrivacySettingsCodeMap: Record<PrivacySettingsType, number> =
  Object.fromEntries(
    Object.keys({} as PrivacySettingsCodeInterface).map((key, index) => [
      key,
      index,
    ])
  ) as Record<PrivacySettingsType, number>;
