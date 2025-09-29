import jwt from 'jsonwebtoken';

const JWT_SECRET = 'a-string-secret-at-least-256-bits-long';
const JWT_EXPIRES_IN = '24h';

export type User = {
    id: string;
};

export const signedToken = (user: User): string => {
    return jwt.sign(user, JWT_SECRET, { algorithm: 'HS256', expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
};
