import { ApolloError } from '@apollo/client';
import { graphqlErrorToObject } from './graphqlErrorToObject';

export const isErrorField = (
  error: ApolloError | undefined,
  name: string
): boolean => {
  return !!graphqlErrorToObject(error)?.find((error) => error.path === name);
};
