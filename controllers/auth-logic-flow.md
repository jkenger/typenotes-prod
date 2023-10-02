Definitions:

RefreshToken - The token that the user needed to be authorized in a certain page. (Usually holds on how long should a user can access the page)

AccessToken - The token that the user needed to access certain api (Usually holds on how long a user can access the apis, shorter than refresh token duration)

How does it work?

- When a user logged in, the api login will first identify if there's a USERNAME or PASSWORD.

- If true, check if the user is exists in the DB.

- If exists, compare password using bcrypt.compare

  ```
  await bcrypt.compare(password, foundUser.password);
  ```

(For user access to an api)

- If the request passes all the conditions above, create an Access Token, JWT will sign a token for userInfo, then will receive an access token secret as well as the expiration time. If success, JWT will create access token.

(For user access to a page)

- After creating access token, it will now create refreshToken that will sign the request's username or email, refresh token will receive refresh token secret as well as expiry time.

- After creating access and refresh token, the controller will set the refreshToken to a cookie named jwt (httpOnly: boolean, secure: boolean:, sameSite: "none", maxAge: number)

- Then send access token to a client

- When the client request for an (When a login, or a page reload) access token, refresh access token controller will be triggered.

- It will check for cookies, if jwt (Refresh Token) does not exist, send an error, a user will be prompted to logi again. If it exist, jwt will verify the refreshToken.

- Check if user exists, then create Access Token, if success, send to the client.

Summary:

- Refresh token will be restored to the cookie.

- Access token will be sent to the client headers.

- The middleware can now check the headers if accesstoken exists and verify it. If authorized, allow to access the apis.

- If access token expired, the query will request for a refresh access token.

- If refresh token expired, the user logged out, then the page will request to login again.
