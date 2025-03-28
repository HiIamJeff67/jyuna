"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSettingRelation = exports.UserSettingTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var enum_schema_1 = require("./enum.schema");
var user_schema_1 = require("./user.schema");
var enums_1 = require("@repo/enums");
var drizzle_orm_1 = require("drizzle-orm");
exports.UserSettingTable = (0, pg_core_1.pgTable)('userSetting', {
    userId: (0, pg_core_1.uuid)('userId')
        .primaryKey()
        .references(function () { return user_schema_1.UserTable.id; }, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    language: (0, enum_schema_1.LanguagePgEnum)('language')
        .notNull()
        .default(enums_1.LanguageEnum.English),
    theme: (0, enum_schema_1.ThemePgEnum)('theme').notNull().default(enums_1.ThemeEnum.Dark),
    timeZone: (0, enum_schema_1.TimeZonePgEnum)('timeZone')
        .notNull()
        .default(enums_1.TimeZoneEnum.UTC_ZERO),
    generalSettingsCode: (0, pg_core_1.integer)('generalSettingsCode').notNull().default(0), // up to 16 bits
    privacySettingsCode: (0, pg_core_1.integer)('privacySettingsCode').notNull().default(0), // up to 16 bits
}, function (table) {
    return {
        timeZoneIndex: (0, pg_core_1.index)('userSetting_timeZoneIndex').on(table.timeZone),
    };
});
exports.UserSettingRelation = (0, drizzle_orm_1.relations)(exports.UserSettingTable, function (_a) {
    var one = _a.one;
    return ({
        user: one(user_schema_1.UserTable, {
            fields: [exports.UserSettingTable.userId],
            references: [user_schema_1.UserTable.id],
        }),
    });
});
