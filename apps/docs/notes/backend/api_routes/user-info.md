## getMyInfo
- **Functionality**:
    - 用於獲取當前使用者的私人資訊。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。
    - 返回使用者的私人資訊，包括顯示名稱、邀請碼、狀態、性別等。

- **Input**:
    - 無需額外的輸入，僅需通過存取權杖進行身份驗證。

- **Output**:
    - **userName**: 使用者名稱。
    - **displayName**: 顯示名稱。
    - **inviteCode**: 邀請碼。
    - **avatarURL**: 頭像 URL。
    - **status**: 使用者狀態。
    - **gender**: 使用者性別。
    - **birthDate**: 出生日期。
    - **selfIntroduction**: 自我介紹。
    - **updatedAt**: 資料更新時間。
    - **createdAt**: 資料創建時間。

```typescript
PrivateUserInfoOutput {
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
      getMyInfo {
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
        "getMyInfo": {
          "userName": "testUser",
          "displayName": "Test User",
          "inviteCode": 12345,
          "avatarURL": null,
          "status": "ACTIVE",
          "gender": "MALE",
          "birthDate": "1990-01-01T00:00:00.000Z",
          "selfIntroduction": "Hello, I am a test user.",
          "updatedAt": "2025-01-01T12:00:00.000Z",
          "createdAt": "2020-01-01T12:00:00.000Z"
        }
      }
    }
    ```

---

## getUserInfo
- **Functionality**:
    - 用於獲取指定使用者的公開資訊。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。
    - 返回指定使用者的公開資訊。

- **Input**:
    - **userName**: 指定的使用者名稱。

```typescript
Args {
    userName: string;
}
```

- **Output**:
    - **userName**: 使用者名稱。
    - **displayName**: 顯示名稱。
    - **inviteCode**: 邀請碼。
    - **avatarURL**: 頭像 URL。
    - **selfIntroduction**: 自我介紹。
    - **updatedAt**: 資料更新時間。
    - **createdAt**: 資料創建時間。

```typescript
PublicUserInfoOutput {
    userName: string;
    displayName: string;
    inviteCode: number;
    avatarURL?: string | null;
    selfIntroduction?: string | null;
    updatedAt: Date;
    createdAt: Date;
}
```

- **範例**:

    **Request**:
    ```graphql
    query {
      getUserInfo(userName: "testUser") {
        userName
        displayName
        inviteCode
        avatarURL
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
        "getUserInfo": {
          "userName": "testUser",
          "displayName": "Test User",
          "inviteCode": 12345,
          "avatarURL": null,
          "selfIntroduction": "Hello, I am a test user.",
          "updatedAt": "2025-01-01T12:00:00.000Z",
          "createdAt": "2020-01-01T12:00:00.000Z"
        }
      }
    }
    ```

---

## getUserInfos
- **Functionality**:
    - 用於獲取多個使用者的公開資訊，支持分頁、排序和篩選。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。

- **Input**:
    - **searchInput**: 搜索關鍵字（可選）。
    - **searchInputType**: 搜索類型（如按名稱、邀請碼等）。
    - **sortOptions**: 排序選項（如按創建時間或更新時間）。
    - **filterOptions**: 篩選條件（如狀態或性別）。
    - **first**: 每頁返回的數量。
    - **after**: 分頁游標。

```typescript
GetRelativeUserInfosInput {
    searchInput?: string;
    searchInputType: SearchUserInputType;
    sortOptions?: SortOptions;
    filterOptions?: FilterOptions;
    first: number;
    after: string;
}
```

- **Output**:
    - **edges**: 包含使用者資訊的節點列表。
    - **totalCount**: 總數量。
    - **hasNextPage**: 是否有下一頁。
    - **hasPrevPage**: 是否有上一頁。

```typescript
PaginatedPublicUserInfosOutput {
    edges: Array<{
        cursor: string;
        node: PublicUserInfo;
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
      getUserInfos(input: { searchInput: "test", first: 10, after: "cursor" }) {
        edges {
          cursor
          node {
            userName
            displayName
            inviteCode
            avatarURL
            selfIntroduction
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
        "getUserInfos": {
          "edges": [
            {
              "cursor": "cursor1",
              "node": {
                "userName": "testUser1",
                "displayName": "Test User 1",
                "inviteCode": 12345,
                "avatarURL": null,
                "selfIntroduction": "Hello, I am test user 1.",
                "updatedAt": "2025-01-01T12:00:00.000Z",
                "createdAt": "2020-01-01T12:00:00.000Z"
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

## updateMyInfo
- **Functionality**:
    - 用於更新當前使用者的私人資訊。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。

- **Input**:
    - **displayName**: 顯示名稱。
    - **status**: 使用者狀態。
    - **gender**: 使用者性別。
    - **birthDate**: 出生日期。
    - **selfIntroduction**: 自我介紹。

```typescript
UpdateUserInfoInput {
    displayName?: string;
    status?: UserStatusType;
    gender?: UserGenderType;
    birthDate?: Date | null;
    selfIntroduction?: string | null;
}
```

- **Output**:
    - **userInfo**: 更新後的使用者資訊。
    - **totCount**: 總更新字段數量。
    - **successCount**: 成功更新的字段數量。

```typescript
AffectedPrivateUserInfoOutput {
    userInfo: PrivateUserInfo;
    totCount: number;
    successCount: number;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      updateMyInfo(input: { displayName: "Updated User" }) {
        userInfo {
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
        totCount
        successCount
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "updateMyInfo": {
          "userInfo": {
            "userName": "testUser",
            "displayName": "Updated User",
            "inviteCode": 12345,
            "avatarURL": null,
            "status": "ACTIVE",
            "gender": "MALE",
            "birthDate": "1990-01-01T00:00:00.000Z",
            "selfIntroduction": "Hello, I am a test user.",
            "updatedAt": "2025-01-01T12:00:00.000Z",
            "createdAt": "2020-01-01T12:00:00.000Z"
          },
          "totCount": 1,
          "successCount": 1
        }
      }
    }
    ```

---

## deleteMyAccount
- **Functionality**:
    - 用於刪除當前使用者的帳號。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。

- **Input**:
    - **password**: 使用者的密碼，用於驗證身份。

```typescript
DeleteAccountInput {
    password: string;
}
```

- **Output**:
    - **totCount**: 總刪除數量。
    - **successCount**: 成功刪除的數量。

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
      deleteMyAccount(input: { password: "Test1234!" }) {
        totCount
        successCount
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "deleteMyAccount": {
          "totCount": 1,
          "successCount": 1
        }
      }
    }
    ```

---
