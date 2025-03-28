"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRelation = exports.NotificationTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var enum_schema_1 = require("./enum.schema");
var drizzle_orm_1 = require("drizzle-orm");
var usersToNotifications_schema_1 = require("./usersToNotifications.schema");
exports.NotificationTable = (0, pg_core_1.pgTable)('notification', {
    id: (0, pg_core_1.uuid)('id').primaryKey().defaultRandom(),
    title: (0, pg_core_1.text)('title').notNull(),
    content: (0, pg_core_1.text)('content').notNull(),
    type: (0, enum_schema_1.NotificationTypePgEnum)('type'),
    linkId: (0, pg_core_1.text)('linkId'),
    updatedAt: (0, pg_core_1.timestamp)('updatedAt')
        .notNull()
        .defaultNow()
        .$onUpdate(function () { return new Date(); }),
    createdAt: (0, pg_core_1.timestamp)('createdAt').notNull().defaultNow(),
}, function (table) {
    return {
        titleIndex: (0, pg_core_1.index)('notification_titleIndex').on(table.title),
        contentIndex: (0, pg_core_1.index)('notification_contentIndex').on(table.content),
        typeIndex: (0, pg_core_1.index)('notification_typeIndex').on(table.type),
        updatedAtIndex: (0, pg_core_1.index)('notification_updatedAtIndex').on(table.updatedAt),
        createdAtIndex: (0, pg_core_1.index)('notification_createdAtIndex').on(table.createdAt),
    };
});
exports.NotificationRelation = (0, drizzle_orm_1.relations)(exports.NotificationTable, function (_a) {
    var many = _a.many;
    return ({
        usersToNotifications: many(usersToNotifications_schema_1.UsersToNotificationsTable),
    });
});
