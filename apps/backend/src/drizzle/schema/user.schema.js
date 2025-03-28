"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRelation = exports.UserTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var enum_schema_1 = require("./enum.schema");
var drizzle_orm_1 = require("drizzle-orm");
var userInfo_schema_1 = require("./userInfo.schema");
var userAuth_schema_1 = require("./userAuth.schema");
var usersToNotifications_schema_1 = require("./usersToNotifications.schema");
var usersToUsers_schema_1 = require("./usersToUsers.schema");
var enums_1 = require("@repo/enums");
var userSetting_schema_1 = require("./userSetting.schema");
exports.UserTable = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userName: (0, pg_core_1.text)('userName').unique().notNull(),
    email: (0, pg_core_1.text)('email').unique().notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    role: (0, enum_schema_1.UserPlanPgEnum)('role').notNull().default(enums_1.UserRoleEnum.NonCertified),
    plan: (0, enum_schema_1.UserRolePgEnum)('plan').notNull().default(enums_1.UserPlanEnum.Free),
    refreshToken: (0, pg_core_1.text)('refreshToken').notNull(),
    userAgent: (0, pg_core_1.text)('userAgent').notNull(),
}, function (table) {
    return {
        userNameIndex: (0, pg_core_1.uniqueIndex)('user_userNameIndex').on(table.userName),
        emailIndex: (0, pg_core_1.uniqueIndex)('user_emailIndex').on(table.email),
        roleIndex: (0, pg_core_1.index)('user_roleIndex').on(table.role),
        planIndex: (0, pg_core_1.index)('user_planIndex').on(table.plan),
        userAgentIndex: (0, pg_core_1.index)('user_userAgentIndex').on(table.userAgent),
    };
});
exports.UserRelation = (0, drizzle_orm_1.relations)(exports.UserTable, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        info: one(userInfo_schema_1.UserInfoTable),
        auth: one(userAuth_schema_1.UserAuthTable),
        setting: one(userSetting_schema_1.UserSettingTable),
        usersToNotifications: many(usersToNotifications_schema_1.UsersToNotificationsTable),
        friendReqFrom: many(usersToUsers_schema_1.UsersToUsersTable, {
            relationName: usersToUsers_schema_1.FromUserRelationName,
        }),
        friendReqTo: many(usersToUsers_schema_1.UsersToUsersTable, {
            relationName: usersToUsers_schema_1.ToUserRelationName,
        }),
    });
});
