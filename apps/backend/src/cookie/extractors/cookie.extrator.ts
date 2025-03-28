import { Request } from 'express';

export const extractRefreshTokenFromCookies = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['refreshToken'];
  }
  return token;
};
