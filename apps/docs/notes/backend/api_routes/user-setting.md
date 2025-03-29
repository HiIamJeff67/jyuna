## getMySetting
- **Functionality**:
    - 用於獲取當前使用者的設定資訊。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。
    - 返回使用者的語言、時區、主題設定，以及一般設定代碼和隱私設定代碼。

- **Input**:
    - 無需額外的輸入，僅需通過存取權杖進行身份驗證。

- **Output**:
    - **language**: 使用者的語言設定。
    - **timeZone**: 使用者的時區設定。
    - **theme**: 使用者的主題設定。
    - **generalSettingsCode**: 一般設定代碼。
    - **privacySettingsCode**: 隱私設定代碼。

```typescript
UserSettingOutput {
    language: LanguageEnum;
    timeZone: TimeZoneEnum;
    theme: ThemeEnum;
    generalSettingsCode: number;
    privacySettingsCode: number;
}
```

- **範例**:

    **Request**:
    ```graphql
    query {
      getMySetting {
        language
        timeZone
        theme
        generalSettingsCode
        privacySettingsCode
      }
    }
    ```

    **Response**:
    ```json
    {
      "data": {
        "getMySetting": {
          "language": "en",
          "timeZone": "UTC",
          "theme": "dark",
          "generalSettingsCode": 123,
          "privacySettingsCode": 456
        }
      }
    }
    ```

---

## updateMySetting
- **Functionality**:
    - 用於更新當前使用者的設定資訊。
    - 需要使用者的存取權杖（Access Token）進行身份驗證。
    - 更新使用者的語言、時區、主題設定，以及一般設定代碼和隱私設定代碼。

- **Input**:
    - **language**: 使用者的語言設定（可選）。
    - **timeZone**: 使用者的時區設定（可選）。
    - **theme**: 使用者的主題設定（可選）。
    - **generalSettingsCode**: 一般設定代碼（可選）。
    - **privacySettingsCode**: 隱私設定代碼（可選）。

```typescript
UpdateUserSettingInput {
    language?: LanguageEnum;
    timeZone?: TimeZoneEnum;
    theme?: ThemeEnum;
    generalSettingsCode?: number;
    privacySettingsCode?: number;
}
```

- **Output**:
    - **userSetting**: 更新後的使用者設定資訊。
    - **totCount**: 總更新字段數量。
    - **successCount**: 成功更新的字段數量。

```typescript
AffectedUserSettingOutput {
    userSetting: UserSetting;
    totCount: number;
    successCount: number;
}
```

- **範例**:

    **Request**:
    ```graphql
    mutation {
      updateMySetting(input: { theme: "light", privacySettingsCode: 789 }) {
        userSetting {
          language
          timeZone
          theme
          generalSettingsCode
          privacySettingsCode
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
        "updateMySetting": {
          "userSetting": {
            "language": "en",
            "timeZone": "UTC",
            "theme": "light",
            "generalSettingsCode": 123,
            "privacySettingsCode": 789
          },
          "totCount": 2,
          "successCount": 2
        }
      }
    }
    ```

---