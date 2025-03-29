## getMyAuth
- **Functionality**:
    - 用於獲取當前使用者的授權資訊。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。
    - 返回使用者的授權資訊，包括電話號碼、第三方平台 ID（如 Discord、Google、Spotify 等）以及資料更新時間。

- **Input**:
    - 無需額外的輸入，僅需通過存取權杖進行身份驗證。

- **Output**:
    - **phoneNumber**: 使用者的電話號碼（可選）。
    - **discordId**: 使用者的 Discord ID（可選）。
    - **googleId**: 使用者的 Google ID（可選）。
    - **spotifyId**: 使用者的 Spotify ID（可選）。
    - **twitchId**: 使用者的 Twitch ID（可選）。
    - **metaId**: 使用者的 Meta ID（可選）。
    - **redditId**: 使用者的 Reddit ID（可選）。
    - **lineId**: 使用者的 Line ID（可選）。
    - **updatedAt**: 資料更新時間。

```typescript
UserAuth {
    phoneNumber?: string | null;
    discordId?: string | null;
    googleId?: string | null;
    spotifyId?: string | null;
    twitchId?: string | null;
    metaId?: string | null;
    redditId?: string | null;
    lineId?: string | null;
    updatedAt: Date;
}
```

- **範例**:

    **Request**:
    ```graphql
    query {
      getMyAuth {
        phoneNumber
        discordId
        googleId
        spotifyId
        twitchId
        metaId
        redditId
        lineId
        updatedAt
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "getMyAuth": {
          "phoneNumber": "+886912345678",
          "discordId": "123456789012345678",
          "googleId": "google-user-id",
          "spotifyId": "spotify-user-id",
          "twitchId": "twitch-user-id",
          "metaId": "meta-user-id",
          "redditId": "reddit-user-id",
          "lineId": "line-user-id",
          "updatedAt": "2025-01-01T12:00:00.000Z"
        }
      }
    }
    ```

---