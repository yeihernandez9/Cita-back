import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: any;
}

export const authorize = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles.some((role: string) => roles.includes(role))) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};