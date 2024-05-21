import 'express-session';

declare module 'express-session' {
  interface SessionData {
    images?: {
      imageDetails: any[];
    };
  }
}