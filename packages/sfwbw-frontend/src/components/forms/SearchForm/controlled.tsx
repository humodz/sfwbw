import { useNavigate } from 'react-router-dom';
import { SearchForm } from '.';
import { useQueryParams, toQueryString } from '../../../utils/router';

interface Props {
  isLoading: boolean;
}

export function ControlledSearchForm(props: Props) {
  const navigate = useNavigate();
  const searchTerm = useSearchTerm();

  return (
    <SearchForm
      searchTerm={searchTerm}
      isLoading={props.isLoading}
      onSearch={(searchTerm) => {
        navigate({ search: toQueryString({ q: searchTerm }) });
      }}
    />
  );
}

export function useSearchTerm() {
  const { q: searchTerm } = useQueryParams();
  return searchTerm || '';
}
