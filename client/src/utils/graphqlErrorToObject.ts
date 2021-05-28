import { ApolloError } from "@apollo/client";

export const graphqlErrorToObject = (error: ApolloError | undefined) => {
  if (!error) return [];
  const { graphQLErrors } = error;
  if (!graphQLErrors[0]) throw error;
  const { extensions } = graphQLErrors[0];
  return extensions?.exception?.validationErrors?.map((a: any) => {
    const keys = Object.keys(a.constraints)[0];
    return { path: a.property, message: a.constraints[keys] };
  });
};
