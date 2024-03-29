import { ReactNode } from 'react';
import { RtkQueryError } from '../../utils';
import { RtkQueryResult } from '../../utils';
import { ErrorMessage } from '../ErrorMessage';
import { LoadingIcon } from '../LoadingIcon';

interface LoaderProps<Data> {
  query: RtkQueryResult<Data>;
  view: (data: Data) => ReactNode;
  error?: (error: RtkQueryError) => ReactNode;
}

export function Loader<Data>(props: LoaderProps<Data>) {
  if (
    props.query.isLoading ||
    props.query.isFetching ||
    props.query.isUninitialized
  ) {
    return <LoadingIcon scale={3} className="mx-auto mt-8 block" />;
  } else if (props.query.isError) {
    if (props.error) {
      return <>{props.error(props.query.error)}</>;
    } else {
      return <ErrorMessage error={props.query.error} />;
    }
  } else if (props.query.isSuccess) {
    return <>{props.view(props.query.data)}</>;
  }

  console.warn('Unreachable');
  return null;
}
