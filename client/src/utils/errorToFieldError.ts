import { ListError } from '../generated/graphql';

export default function errorToFieldError(errors: ListError[]) {
  if (!errors || errors.length === 0) return {};
  return errors.reduce((acc: { [k: string]: string[] }, error) => {
    if (error.path in acc) {
      acc[error.path].push(error.msg);
    } else {
      acc[error.path] = [error.msg];
    }
    return acc;
  }, {});
}
