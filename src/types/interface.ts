interface User {
    username: string;
    roles: string[];
  }

  interface AuthenticatedRequest extends Request {
    user?: User;
  }