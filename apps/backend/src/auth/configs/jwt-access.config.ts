/* =============== Main Libraries =============== */
import { registerAs } from '@nestjs/config';
/* =============== Main Libraries =============== */

export default registerAs('jwtAccess', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRED_TIME,
}));
