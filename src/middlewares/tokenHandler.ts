import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, process.env.JWT_SECRET!, (error) => {
        if (error) {
            return res.sendStatus(403); // Invalid token
        }
        next();
    });
};


