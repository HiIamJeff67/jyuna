"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInfoRelation = exports.UserInfoTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var user_schema_1 = require("./user.schema");
var enum_schema_1 = require("./enum.schema");
var drizzle_orm_1 = require("drizzle-orm");
var enums_1 = require("@repo/enums");
exports.UserInfoTable = (0, pg_core_1.pgTable)('userInfo', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    userId: (0, pg_core_1.uuid)('userId')
        .references(function () { return user_schema_1.UserTable.id; }, {
        onDelete: 'cascade',
    })
        .unique()
        .notNull(),
    userName: (0, pg_core_1.text)('userName')
        .references(function () { return user_schema_1.UserTable.userName; }, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    })
        .notNull()
        .unique(),
    displayName: (0, pg_core_1.text)('displayName').notNull(),
    inviteCode: (0, pg_core_1.serial)('inviteCode').notNull().unique(),
    avatarURL: (0, pg_core_1.text)('avatarURL'),
    status: (0, enum_schema_1.UserGenderPgEnum)('status')
        .notNull()
        .default(enums_1.UserStatusEnum.Offline),
    gender: (0, enum_schema_1.UserStatusPgEnum)('gender')
        .notNull()
        .default(enums_1.UserGenderEnum.PreferNotToSay),
    birthDate: (0, pg_core_1.timestamp)('birthDate'),
    selfIntroduction: (0, pg_core_1.text)('selfIntroduction'),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt')
        .notNull()
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    createdAt: (0, pg_core_1.timestamp)('createdAt').notNull().defaultNow(),
}, function (table) {
    return {
        userIdIndex: (0, pg_core_1.uniqueIndex)('userInfo_userIdIndex').on(table.userId),
        userNameIndex: (0, pg_core_1.uniqueIndex)('userInfo_userNameIndex').on(table.userName),
        displayNameIndex: (0, pg_core_1.index)('userInfo_displayNameIndex').on(table.displayName),
        inviteCodeIndex: (0, pg_core_1.uniqueIndex)('userInfo_inviteCodeIndex').on(table.inviteCode),
        statusIndex: (0, pg_core_1.index)('userInfo_statusIndex').on(table.status),
        birthDateIndex: (0, pg_core_1.index)('userInfo_birthDateIndex').on(table.birthDate),
        updatedAtIndex: (0, pg_core_1.index)('userInfo_updatedAtIndex').on(table.updatedAt),
        createdAtIndex: (0, pg_core_1.index)('userInfo_createdAtIndex').on(table.createdAt),
    };
});
exports.UserInfoRelation = (0, drizzle_orm_1.relations)(exports.UserInfoTable, function (_a) {
    var one = _a.one;
    return ({
        user: one(user_schema_1.UserTable, {
            fields: [exports.UserInfoTable.userId],
            references: [user_schema_1.UserTable.id],
        }),
    });
});
