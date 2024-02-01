import { Request, Response, NextFunction } from 'express';

interface RequestWithUser extends Request {
    user?: {
        userId: string;
        isAdmin: boolean;
    };
}

const isAdminMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).send('Access denied. User is not an administrator.');
    }
};

export default isAdminMiddleware;
