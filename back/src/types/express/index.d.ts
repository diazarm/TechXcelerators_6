import 'express';

declare module 'express-serve-static-core' {
  interface Request {
  user?: import('../../models/User').IUser;
  }
}
