* Use double tokens for security : ```accessToken``` + ```refreshToken```
	* ```accessToken``` : Short life time, with 15 min life time, we can make sure even if someone stole the accessToken, he/she can only use this token for most 15 mins
	* ```refreshToken``` : Long life time, with 7 days life time, if the user with accessToken expired, but does hold the refreshToken, we can generate a new accessToken base on this refreshToken for him/her, this will help improve the experience of the user by not frequently login. **This token would be store in some way like Https-only Cookies, and we will check the real position of the user is the same as the data in database using the IP of that user, if the position is different, then we will enforce the user to login again**

* NestJS Build-in OAuth

* Custom Guards : 
	* RolesGuard : By adding the role column in the database to the Jwt token, we can now parse the token and get the role of specific user. Then we build the decorator to make developers to select roles, and the selected roles would pass to the ```RolesGuard()``` to check if the user with role parsed be jwt token does have the role in the decorator.
	* PlansGuard : Same at the above way to build.