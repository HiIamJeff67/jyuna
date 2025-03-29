## getMyNotification
- **Functionality**:
    - 用於獲取當前使用者的單一通知。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。
    - 返回指定通知的詳細資訊。

- **Input**:
    - **notificationId**: 通知的唯一 ID。

```typescript
GetNotificationInput {
    notificationId: string;
}
```

- **Output**:
    - **id**: 通知的唯一 ID。
    - **title**: 通知的標題。
    - **content**: 通知的內容。
    - **type**: 通知的類型（可選）。
    - **linkId**: 通知的相關連結 ID（可選）。
    - **isRead**: 通知是否已讀。
    - **updatedAt**: 通知的更新時間。
    - **createdAt**: 通知的創建時間。

```typescript
NotificationOutput {
    id: string;
    title: string;
    content: string;
    type?: NotificationType;
    linkId?: string;
    isRead: boolean;
    updatedAt: Date;
    createdAt: Date;
}
```

- **範例**:

    **Request**:
    ```graphql
    query {
      getMyNotification(input: { notificationId: "12345" }) {
        id
        title
        content
        type
        linkId
        isRead
        updatedAt
        createdAt
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "getMyNotification": {
          "id": "12345",
          "title": "Welcome",
          "content": "Welcome to our platform!",
          "type": "INFO",
          "linkId": null,
          "isRead": false,
          "updatedAt": "2025-01-01T12:00:00.000Z",
          "createdAt": "2025-01-01T12:00:00.000Z"
        }
      }
    }
    ```

---

## getMyNotifications
- **Functionality**:
    - 用於獲取當前使用者的所有通知，支持分頁。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。

- **Input**:
    - **first**: 每頁返回的通知數量（預設為 10）。
    - **after**: 分頁游標（預設為初始值）。
    - **totCount**: 總通知數量（可選）。

```typescript
GetNotificationsInput {
    first: number;
    after: string;
    totCount?: number;
}
```

- **Output**:
    - **edges**: 包含通知資訊的節點列表。
    - **totalCount**: 總通知數量。
    - **hasNextPage**: 是否有下一頁。
    - **hasPrevPage**: 是否有上一頁。

```typescript
PaginatedNotificationsOutput {
    edges: Array<{
        cursor: string;
        node: Notification;
    }>;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
```

- **範例**:

    **Request**:
    ```graphql
    query {
      getMyNotifications(input: { first: 10, after: "cursor" }) {
        edges {
          cursor
          node {
            id
            title
            content
            type
            linkId
            isRead
            updatedAt
            createdAt
          }
        }
        totalCount
        hasNextPage
        hasPrevPage
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "getMyNotifications": {
          "edges": [
            {
              "cursor": "cursor1",
              "node": {
                "id": "12345",
                "title": "Welcome",
                "content": "Welcome to our platform!",
                "type": "INFO",
                "linkId": null,
                "isRead": false,
                "updatedAt": "2025-01-01T12:00:00.000Z",
                "createdAt": "2025-01-01T12:00:00.000Z"
              }
            }
          ],
          "totalCount": 1,
          "hasNextPage": false,
          "hasPrevPage": false
        }
      }
    }
    ```

---

## createNotifications
- **Functionality**:
    - 用於創建通知並發送給指定的使用者。
    - 僅限具有 `Developer` 或 `Admin` 角色的使用者操作。

- **Input**:
    - **to**: 接收通知的使用者 ID 列表。
    - **title**: 通知的標題。
    - **content**: 通知的內容。
    - **type**: 通知的類型（可選）。
    - **linkId**: 通知的相關連結 ID（可選）。

```typescript
CreateNotificationInput {
    to: string[];
    title: string;
    content: string;
    type?: NotificationType;
    linkId?: string;
}
```

- **Output**:
    - **notification**: 創建的通知資訊。
    - **totCount**: 總接收者數量。
    - **successCount**: 成功接收通知的使用者數量。

```typescript
AffectedNotificationsOutput {
    notification: Notification;
    totCount: number;
    successCount: number;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      createNotifications(input: { 
        to: ["user1", "user2"], 
        title: "System Update", 
        content: "The system will be updated at midnight.", 
        type: "ALERT" 
      }) {
        notification {
          id
          title
          content
          type
          linkId
          isRead
          updatedAt
          createdAt
        }
        totCount
        successCount
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "createNotifications": {
          "notification": {
            "id": "67890",
            "title": "System Update",
            "content": "The system will be updated at midnight.",
            "type": "ALERT",
            "linkId": null,
            "isRead": false,
            "updatedAt": "2025-01-01T12:00:00.000Z",
            "createdAt": "2025-01-01T12:00:00.000Z"
          },
          "totCount": 2,
          "successCount": 2
        }
      }
    }
    ```

---

## updateMyNotifications
- **Functionality**:
    - 用於標記當前使用者的通知為已讀。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。

- **Input**:
    - **notificationIds**: 要標記為已讀的通知 ID 列表。

```typescript
UpdateNotificationInput {
    notificationIds: string[];
}
```

- **Output**:
    - **totCount**: 總通知數量。
    - **successCount**: 成功標記為已讀的通知數量。

```typescript
AffectedCountOutput {
    totCount: number;
    successCount: number;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      updateMyNotifications(input: { notificationIds: ["12345", "67890"] }) {
        totCount
        successCount
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "updateMyNotifications": {
          "totCount": 2,
          "successCount": 2
        }
      }
    }
    ```

---

## deleteMyNotifications
- **Functionality**:
    - 用於刪除當前使用者的通知。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。

- **Input**:
    - **notificationIds**: 要刪除的通知 ID 列表。

```typescript
DeleteNotificationInput {
    notificationIds: string[];
}
```

- **Output**:
    - **totCount**: 總通知數量。
    - **successCount**: 成功刪除的通知數量。

```typescript
AffectedCountOutput {
    totCount: number;
    successCount: number;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      deleteMyNotifications(input: { notificationIds: ["12345", "67890"] }) {
        totCount
        successCount
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "deleteMyNotifications": {
          "totCount": 2,
          "successCount": 2
        }
      }
    }
    ```