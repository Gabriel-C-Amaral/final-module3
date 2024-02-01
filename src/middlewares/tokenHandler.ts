import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    userId: string;
    isAdministrator: boolean;
}

interface RequestWithUser extends Request {
    user?: UserPayload;
}

export const authenticateToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, process.env.JWT_SECRET!, (error, user) => {
        if (error) {
            return res.sendStatus(403); // Invalid token
        }
        req.user = user as UserPayload; // Attach user payload to request
        console.log(user)
        next();
    });
};
