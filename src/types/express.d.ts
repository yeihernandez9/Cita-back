// express.d.ts
import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface User {
      roles: string[];
    }

    interface Request {
      user?: User;
    }
  }
}