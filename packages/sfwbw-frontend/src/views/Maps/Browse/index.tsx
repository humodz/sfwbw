import {
  ControlledSearchForm,
  useSearchTerm,
} from '../../../components/forms/SearchForm/controlled';
import { useSearchMapsQuery } from '../../../store/api/design-map';

export function BrowseMaps() {
  const searchTerm = useSearchTerm();

  const searchMapsResult = useSearchMapsQuery(searchTerm || '');

  if (searchMapsResult.isSuccess) {
    const x = searchMapsResult.data;
  }

  return (
    <>
      <ControlledSearchForm isLoading={false} />
      <div>
        {searchMapsResult.isSuccess &&
          searchMapsResult.data.map((designMap) => (
            <code key={designMap.id}>{JSON.stringify(designMap)}</code>
          ))}
      </div>
    </>
  );
}
