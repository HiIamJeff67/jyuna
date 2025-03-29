## defaultRegister
- **Functionality**:
    - 用於新使用者註冊帳號。
    - 接收使用者的基本資訊（如使用者名稱、顯示名稱、電子郵件和密碼）。
    - 將使用者資訊存入資料庫，並初始化相關設定（如語言、時區和主題）。
    - 返回存取權杖（Access Token）和其他使用者設定。
- **Input**:
	- **userName**: 使用者名稱（必須是字母和數字，至少6，最多20個字元）。
	- **displayName**: 顯示名稱。
	- **email**: 電子郵件地址（必須是有效的電子郵件格式）。
	- **password**: 密碼（必須符合強密碼規範, 包含英文大小寫及數字和至少一個符號，且大於8個字元）。
```
DefaultRegisterInput {
	userName: string;
	displayName: string;
	email: string;
	password: string;
}
```
- **Output**:
	- **accessToken**: 存取權杖，用於後續的 API 認證。
	- **expiresIn**: 存取權杖的有效時間（秒）。
	- **language**: 使用者的預設語言。
	- **timeZone**: 使用者的時區。
	- **theme**: 使用者的主題設定。
```
DefaultRegisterOutput {
	accessToken: string;
	expiresIn: number;
	language: LanguageEnum;
	timeZone: TimeZoneEnum;
	theme: ThemeEnum;
}
```
* **Request**:
```
mutation {
	defaultRegister(
		input: {
			userName: "testUser"
			displayName: "Test User"
			email: "testuser@example.com"
			password: "Test1234!"
		}
	) {
		accessToken
		expiresIn
		language
		timeZone
		theme
	}
}
```
* **Response**:
```
{
	"data": {
		"defaultRegister": {
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"expiresIn": 3600,
			"language": "en",
			"timeZone": "UTC",
			"theme": "dark"
		}
	}
}
```

## defaultLogin
- **Functionality**:
    - 用於已註冊使用者登入。
    - 接收使用者的帳號（使用者名稱或電子郵件）和密碼。
    - 驗證帳號和密碼是否正確。
    - 返回存取權杖（Access Token）和其他使用者設定。
- **Input**:
	- **account**: 使用者名稱或電子郵件。
	- **password**: 密碼。
```
DefaultLoginInput {
	account: string;
	password: string;
}
```
- **Output**:
	- **accessToken**: 存取權杖，用於後續的 API 認證。
	- **expiresIn**: 存取權杖的有效時間（秒）。
	- **language**: 使用者的預設語言。
	- **timeZone**: 使用者的時區。
	- **theme**: 使用者的主題設定。
```
DefaultLoginOutput {
	accessToken: string;
	expiresIn: number;
	language: LanguageEnum;
	timeZone: TimeZoneEnum;
	theme: ThemeEnum;
}
```
* **Request**:
```
mutation {
	defaultLogin(
		input: {
			account: "testUser"
			password: "Test1234!"
		}
	) {
		accessToken
		expiresIn
		language
		timeZone
		theme
	}
}
```
* **Response**:
```
{
	"data": {
		"defaultLogin": {
			"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
			"expiresIn": 3600,
			"language": "en",
			"timeZone": "UTC",
			"theme": "dark"
		}
	}
}
```