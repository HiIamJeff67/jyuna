import { EnvironmentEnum } from "@repo/enums";

export type EnvironmentType = keyof typeof EnvironmentEnum;

export const EnvironmentValues = Object.values(EnvironmentEnum) as [
  string,
  ...string[],
];

export type EnvironmentConfigType = {
  BackendApiURL: string;
  BackendPort: number;
  WebApiURL: string;
  WebPort: number;
  SoftwareApiURL: string;
  SoftwarePort: number;
  EnableAI: boolean;
  EnableDBConnection: boolean;
  __EnvName: EnvironmentType;
};
