"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersToUsersRelation = exports.ToUserRelationName = exports.FromUserRelationName = exports.UsersToUsersTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var schema_1 = require("./schema");
var enum_schema_1 = require("./enum.schema");
var drizzle_orm_1 = require("drizzle-orm");
exports.UsersToUsersTable = (0, pg_core_1.pgTable)('usersToUsers', {
    fromUser: (0, pg_core_1.uuid)('fromUser').references(function () { return schema_1.UserTable.id; }, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    toUser: (0, pg_core_1.uuid)('toUser').references(function () { return schema_1.UserTable.id; }, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
    }),
    status: (0, enum_schema_1.UsersToUsersStatusPgEnum)('status').notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt')
        .notNull()
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    createdAt: (0, pg_core_1.timestamp)('createdAt').notNull().defaultNow(),
}, function (table) {
    return {
        pk: (0, pg_core_1.primaryKey)({ columns: [table.fromUser, table.toUser] }),
        fromUserIndex: (0, pg_core_1.uniqueIndex)('usersToUsers_fromUserIndex').on(table.fromUser),
        toUserIndex: (0, pg_core_1.uniqueIndex)('usersToUsers_toUserIndex').on(table.toUser),
    };
});
exports.FromUserRelationName = 'friend_requests_from';
exports.ToUserRelationName = 'friend_requests_to';
exports.UsersToUsersRelation = (0, drizzle_orm_1.relations)(exports.UsersToUsersTable, function (_a) {
    var one = _a.one;
    return ({
        from: one(schema_1.UserTable, {
            relationName: exports.FromUserRelationName,
            fields: [exports.UsersToUsersTable.fromUser],
            references: [schema_1.UserTable.id],
        }),
        to: one(schema_1.UserTable, {
            relationName: exports.ToUserRelationName,
            fields: [exports.UsersToUsersTable.toUser],
            references: [schema_1.UserTable.id],
        }),
    });
});
