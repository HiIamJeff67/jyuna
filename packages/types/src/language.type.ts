import { LanguageEnum } from "@repo/enums";

export type LanguageType = keyof typeof LanguageEnum;

export const LanguageValues = Object.values(LanguageEnum) as [
  string,
  ...string[],
];
