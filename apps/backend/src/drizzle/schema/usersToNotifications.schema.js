"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersToNotificationsRelation = exports.UsersToNotificationsTable = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var user_schema_1 = require("./user.schema");
var notification_schema_1 = require("./notification.schema");
var drizzle_orm_1 = require("drizzle-orm");
exports.UsersToNotificationsTable = (0, pg_core_1.pgTable)('usersToNotifications', {
    userId: (0, pg_core_1.uuid)('userId')
        .references(function () { return user_schema_1.UserTable.id; }, {
        onDelete: 'cascade',
    })
        .notNull(),
    notificationId: (0, pg_core_1.uuid)('notificationId')
        .references(function () { return notification_schema_1.NotificationTable.id; }, {
        onDelete: 'cascade',
    })
        .notNull(),
    isRead: (0, pg_core_1.boolean)('isRead').notNull().default(false),
}, function (table) {
    return {
        pk: (0, pg_core_1.primaryKey)({ columns: [table.userId, table.notificationId] }),
        userIdIndex: (0, pg_core_1.index)('usersToNotifications_userIdIndex').on(table.userId),
        notificationIdIndex: (0, pg_core_1.index)('usersToNotifications_notificationIdIndex').on(table.notificationId),
    };
});
exports.UsersToNotificationsRelation = (0, drizzle_orm_1.relations)(exports.UsersToNotificationsTable, function (_a) {
    var one = _a.one;
    return ({
        user: one(user_schema_1.UserTable, {
            fields: [exports.UsersToNotificationsTable.userId],
            references: [user_schema_1.UserTable.id],
        }),
        notification: one(notification_schema_1.NotificationTable, {
            fields: [exports.UsersToNotificationsTable.notificationId],
            references: [notification_schema_1.NotificationTable.id],
        }),
    });
});
