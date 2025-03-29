## createFriendRequest
- **Functionality**:
    - 用於發送好友請求。
    - 使用邀請碼找到目標使用者，並建立好友請求。
    - 好友請求的狀態預設為 `Pending`。

- **Input**:
    - **inviteCode**: 目標使用者的邀請碼。

```typescript
CreateFriendRequestInput {
    inviteCode: number;
}
```

- **Output**:
    - **status**: 好友請求的狀態。

```typescript
CreateFriendRequestOutput {
    status: UsersToUsersStatusEnum;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      createFriendRequest(input: { inviteCode: 12345 }) {
        status
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "createFriendRequest": {
          "status": "Pending"
        }
      }
    }
    ```

---

## getFriendRequestsFromMe
- **Functionality**:
    - 用於獲取當前使用者發出的好友請求。
    - 返回所有狀態為 `Pending` 的好友請求。

- **Input**:
    - 無需額外的輸入，僅需通過存取權杖進行身份驗證。

- **Output**:
    - **friendStatus**: 好友請求的狀態。
    - **userName**: 目標使用者的名稱。
    - **displayName**: 目標使用者的顯示名稱。
    - **inviteCode**: 目標使用者的邀請碼。
    - **avatarURL**: 目標使用者的頭像 URL。
    - **status**: 目標使用者的狀態。
    - **gender**: 目標使用者的性別。
    - **birthDate**: 目標使用者的出生日期。
    - **selfIntroduction**: 目標使用者的自我介紹。
    - **updatedAt**: 資料更新時間。
    - **createdAt**: 資料創建時間。

```typescript
FriendRequestOutput {
    friendStatus: UsersToUsersStatusEnum;
    userName: string;
    displayName: string;
    inviteCode: number;
    avatarURL?: string | null;
    status: UserStatusType;
    gender: UserGenderType;
    birthDate: Date | null;
    selfIntroduction?: string | null;
    updatedAt: Date;
    createdAt: Date;
}
```

- **範例**:

    **Request**:
    ```graphql
    query {
      getFriendRequestsFromMe {
        friendStatus
        userName
        displayName
        inviteCode
        avatarURL
        status
        gender
        birthDate
        selfIntroduction
        updatedAt
        createdAt
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "getFriendRequestsFromMe": [
          {
            "friendStatus": "Pending",
            "userName": "targetUser",
            "displayName": "Target User",
            "inviteCode": 12345,
            "avatarURL": null,
            "status": "ACTIVE",
            "gender": "FEMALE",
            "birthDate": "1995-01-01T00:00:00.000Z",
            "selfIntroduction": "Hello, I am Target User.",
            "updatedAt": "2025-01-01T12:00:00.000Z",
            "createdAt": "2020-01-01T12:00:00.000Z"
          }
        ]
      }
    }
    ```

---

## getFriendRequestsToMe
- **Functionality**:
    - 用於獲取當前使用者收到的好友請求。
    - 返回所有狀態為 `Pending` 的好友請求。

- **Input**:
    - 無需額外的輸入，僅需通過存取權杖進行身份驗證。

- **Output**:
    - 與 `getFriendRequestsFromMe` 相同。

- **範例**:

    **Request**:
    ```graphql
    query {
      getFriendRequestsToMe {
        friendStatus
        userName
        displayName
        inviteCode
        avatarURL
        status
        gender
        birthDate
        selfIntroduction
        updatedAt
        createdAt
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "getFriendRequestsToMe": [
          {
            "friendStatus": "Pending",
            "userName": "requestingUser",
            "displayName": "Requesting User",
            "inviteCode": 67890,
            "avatarURL": null,
            "status": "ACTIVE",
            "gender": "MALE",
            "birthDate": "1990-01-01T00:00:00.000Z",
            "selfIntroduction": "Hello, I am Requesting User.",
            "updatedAt": "2025-01-01T12:00:00.000Z",
            "createdAt": "2020-01-01T12:00:00.000Z"
          }
        ]
      }
    }
    ```

---

## cancelFriendRequest
- **Functionality**:
    - 用於取消當前使用者發出的好友請求。
    - 只能取消狀態為 `Pending` 的好友請求。

- **Input**:
    - **to**: 目標使用者的 ID。

```typescript
CancelFriendRequestInput {
    to: string;
}
```

- **Output**:
    - **status**: 被取消的好友請求的狀態。

```typescript
CancelFriendRequestOutput {
    status: UsersToUsersStatusEnum;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      cancelFriendRequest(input: { to: "targetUserId" }) {
        status
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "cancelFriendRequest": {
          "status": "Pending"
        }
      }
    }
    ```

---

## rejectFriendRequest
- **Functionality**:
    - 用於拒絕當前使用者收到的好友請求。
    - 只能拒絕狀態為 `Pending` 的好友請求。

- **Input**:
    - **from**: 發送好友請求的使用者 ID。

```typescript
RejectFriendRequestInput {
    from: string;
}
```

- **Output**:
    - **status**: 被拒絕的好友請求的狀態。

```typescript
RejectFriendRequestOutput {
    status: UsersToUsersStatusEnum;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      rejectFriendRequest(input: { from: "requestingUserId" }) {
        status
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "rejectFriendRequest": {
          "status": "Pending"
        }
      }
    }
    ```

---