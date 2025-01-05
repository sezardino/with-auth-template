export const SESSION_COOKIE_NAME = "session";

const secretKey = process.env.SESSION_SECRET_KEY;
export const SESSION_JWT_ENCODED_KEY = new TextEncoder().encode(secretKey);
