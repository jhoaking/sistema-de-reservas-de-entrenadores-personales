import { AuthType } from "../authTypes";

declare global {
  namespace Express {
    interface Request {
      user?: AuthType;
    }
  }
}
export {};