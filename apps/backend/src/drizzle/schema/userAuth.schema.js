"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthRelation = exports.UserAuthTable = void 0;
var drizzle_orm_1 = require("drizzle-orm");
var pg_core_1 = require("drizzle-orm/pg-core");
var user_schema_1 = require("./user.schema");
exports.UserAuthTable = (0, pg_core_1.pgTable)('userAuth', {
    userId: (0, pg_core_1.uuid)('userId')
        .primaryKey()
        .references(function () { return user_schema_1.UserTable.id; }, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    authCode: (0, pg_core_1.text)('authCode').notNull(),
    authCodeExpiredAt: (0, pg_core_1.timestamp)('authCodeExpiredAt').notNull(),
    isEmailAuthenticated: (0, pg_core_1.boolean)('isEmailAuthenticated')
        .notNull()
        .default(false),
    phoneNumber: (0, pg_core_1.text)('phoneNumber').unique(),
    discordId: (0, pg_core_1.text)('discordId').unique(),
    googleId: (0, pg_core_1.text)('googleId').unique(),
    spotifyId: (0, pg_core_1.text)('spotifyId').unique(),
    twitchId: (0, pg_core_1.text)('twitchId').unique(),
    metaId: (0, pg_core_1.text)('metaId').unique(),
    redditId: (0, pg_core_1.text)('redditId').unique(),
    lineId: (0, pg_core_1.text)('lineId').unique(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt')
        .notNull()
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
}, function (table) {
    return {
        phoneNumberIndex: (0, pg_core_1.uniqueIndex)('userAuth_phoneNumberIndex').on(table.phoneNumber),
        discordIdIndex: (0, pg_core_1.uniqueIndex)('userAuth_discordIdIndex').on(table.discordId),
        googleIdIndex: (0, pg_core_1.uniqueIndex)('userAuth_googldIdIndex').on(table.googleId),
        spotifyIdIndex: (0, pg_core_1.uniqueIndex)('userAuth_spotifyIdIndex').on(table.spotifyId),
        twitchIdIndex: (0, pg_core_1.uniqueIndex)('userAuth_twitchIdIndex').on(table.twitchId),
        metaIdIndex: (0, pg_core_1.uniqueIndex)('userAuth_metaIdIndex').on(table.metaId),
        redditIdIndex: (0, pg_core_1.uniqueIndex)('userAuth_redditIdIndex').on(table.redditId),
        lineIdIndex: (0, pg_core_1.uniqueIndex)('userAuth_lineIdIndex').on(table.lineId),
    };
});
exports.UserAuthRelation = (0, drizzle_orm_1.relations)(exports.UserAuthTable, function (_a) {
    var one = _a.one;
    return ({
        user: one(user_schema_1.UserTable, {
            fields: [exports.UserAuthTable.userId],
            references: [user_schema_1.UserTable.id],
        }),
    });
});
