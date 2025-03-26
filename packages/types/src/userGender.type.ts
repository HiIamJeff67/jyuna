import { UserGenderEnum } from "@repo/enums";

export type UserGenderType = keyof typeof UserGenderEnum;

export const UserGenderValues = Object.values(UserGenderEnum) as [
  string,
  ...string[],
];
