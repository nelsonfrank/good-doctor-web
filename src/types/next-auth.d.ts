import { DefaultSession } from "next-auth";
import { IUser } from "../server/common/validation/auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
    } & IUser;
  }
}
