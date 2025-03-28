"use strict";
/*
 * we use this file to manage all the enums in our schema,
 * since if we don't do that, it may cause some circular dependency error
 * ex. purchaseOrder.schema.ts require 'postStatusEnum' and supplyOrder.schema.ts also need one,
 *     if we create 'postStatusEnum' on one of the above schema, then import that one on the other schema,
 *     it will run into the error when you execute npm run start:dev, despite the fact that Neon migration doesn't have this issue
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeZonePgEnum = exports.ThemePgEnum = exports.LanguagePgEnum = exports.UsersToUsersStatusPgEnum = exports.NotificationTypePgEnum = exports.UserPlanPgEnum = exports.UserRolePgEnum = exports.UserGenderPgEnum = exports.UserStatusPgEnum = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var types_1 = require("@repo/types");
/* ================================= Status Enums ================================= */
exports.UserStatusPgEnum = (0, pg_core_1.pgEnum)('userStatusEnum', types_1.UserStatusValues);
exports.UserGenderPgEnum = (0, pg_core_1.pgEnum)('userGenderEnum', types_1.UserGenderValues);
exports.UserRolePgEnum = (0, pg_core_1.pgEnum)('userRoleEnum', types_1.UserRoleValues);
exports.UserPlanPgEnum = (0, pg_core_1.pgEnum)('userPlanEnum', types_1.UserPlanValues);
exports.NotificationTypePgEnum = (0, pg_core_1.pgEnum)('notificationTypeEnum', types_1.NotificationValues);
exports.UsersToUsersStatusPgEnum = (0, pg_core_1.pgEnum)('usersToUsersStatusEnum', types_1.UsersToUsersStatusValues);
/* ================================= Status Enums ================================= */
/* ================================= Setting Enums ================================= */
exports.LanguagePgEnum = (0, pg_core_1.pgEnum)('languageEnum', types_1.LanguageValues);
exports.ThemePgEnum = (0, pg_core_1.pgEnum)('themeEnum', types_1.ThemeValues);
exports.TimeZonePgEnum = (0, pg_core_1.pgEnum)('timeZoneEnum', types_1.TimeZoneValues);
/* ================================= Setting Enums ================================= */
