import { ApolloError } from "@apollo/client";

export const isAuthError = (
  error: ApolloError | undefined
): boolean => {
  return (
    error?.graphQLErrors[0]?.extensions?.code === "UNAUTHENTICATED"
  );
};
