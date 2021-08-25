import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { Context } from "./index";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (!context.user) {
    throw new AuthenticationError("not authenticated");
  }
  return next();
};
