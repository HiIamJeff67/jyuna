import { EnvironmentConfigType, EnvironmentType } from "@repo/types";

export const EnvironmentConfig: Record<EnvironmentType, EnvironmentConfigType> =
  {
    development: {
      BackendApiURL: "http://localhost",
      BackendPort: 3333,
      WebApiURL: "http://localhost",
      WebPort: 3000,
      SoftwareApiURL: "",
      SoftwarePort: 0,
      EnableAI: false,
      EnableDBConnection: true,
      __EnvName: "development",
    },
    // currently useless
    production: {
      BackendApiURL: "http://localhost",
      BackendPort: 3333,
      WebApiURL: "http://localhost",
      WebPort: 3000,
      SoftwareApiURL: "",
      SoftwarePort: 0,
      EnableAI: false,
      EnableDBConnection: true,
      __EnvName: "production",
    },
    e2eTesting: {
      BackendApiURL: "http://localhost",
      BackendPort: 3333,
      WebApiURL: "http://localhost",
      WebPort: 3000,
      SoftwareApiURL: "",
      SoftwarePort: 0,
      EnableAI: false,
      EnableDBConnection: true,
      __EnvName: "e2eTesting",
    },
    // currently useless
    webTesting: {
      BackendApiURL: "http://localhost",
      BackendPort: 3333,
      WebApiURL: "http://localhost",
      WebPort: 3000,
      SoftwareApiURL: "",
      SoftwarePort: 0,
      EnableAI: false,
      EnableDBConnection: true,
      __EnvName: "webTesting",
    },
  } as const; // read only
