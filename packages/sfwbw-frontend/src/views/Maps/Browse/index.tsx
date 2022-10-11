import {
  ControlledSearchForm,
  useSearchTerm,
} from '../../../components/forms/SearchForm/controlled';

export function BrowseMaps() {
  const searchTerm = useSearchTerm();

  return (
    <>
      <ControlledSearchForm isLoading={false} />
    </>
  );
}
