import { PrivacySettingsCodeMap } from "@repo/constants";
import { PrivacySettingsCodeInterface } from "@repo/interfaces";
import { PrivacySettingsType } from "@repo/types";

export const privacySettingsCodeParser = function (
  code: number
): PrivacySettingsCodeInterface {
  const keys = Object.keys(
    {} as PrivacySettingsCodeInterface
  ) as (keyof PrivacySettingsCodeInterface)[];
  const privacySettings: Partial<PrivacySettingsCodeInterface> = {};
  for (let i = 0; i < keys.length; i++) {
    if (keys[i]) {
      privacySettings[keys[i]] = code % 2 === 1;
    }
    code /= 2;
  }

  const finalSettings = privacySettings as PrivacySettingsCodeInterface;
  return finalSettings;
};

export const getPrivacySettingsOf = function (
  code: number,
  field: PrivacySettingsType
) {
  let offset = PrivacySettingsCodeMap[field];
  while (offset--) code /= 2;
  return code % 2 === 1;
};
