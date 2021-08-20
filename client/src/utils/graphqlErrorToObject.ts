import { ApolloError } from "@apollo/client";

export interface ErrorObject {
  path: string;
  message: string;
}

export const graphqlErrorToObject = (
  error: ApolloError | undefined
): ErrorObject[] => {
  if (!error) return [];

  const { graphQLErrors } = error;

  if (!graphQLErrors[0]) return [];
  const { extensions } = graphQLErrors[0];

  return extensions?.exception?.validationErrors?.map((a: any) => {
    const keys = Object.keys(a.constraints)[0];
    return { path: a.property, message: a.constraints[keys] };
  });
};
