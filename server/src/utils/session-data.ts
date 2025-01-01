import { Session } from "express-session";

import { SessionData } from "express-session";
import { ApiError } from "./errors";

declare module "express-session" {
  interface SessionData {
    userId: number;
    userType: "patient" | "doctor" | "registrar";
  }
}

export const getSessionData = (
  session: Session & Partial<SessionData>
): SessionData => {
  if (!session.userId || !session.userType || !session.cookie) {
    throw new ApiError({
      message: "User not logged in",
    });
  }

  return {
    userId: session.userId,
    userType: session.userType,
    cookie: session.cookie,
  };
};
