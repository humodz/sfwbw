import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => {
    const urlSearchParams = new URLSearchParams(search);

    const query: Record<string, string | undefined> = {};

    for (const key of urlSearchParams.keys()) {
      const value = urlSearchParams.get(key);

      if (value !== null) {
        query[key] = value;
      }
    }

    return query;
  }, [search]);
}

export function toQueryString(query: Record<string, string>) {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== null && value !== undefined) {
      urlSearchParams.set(key, value);
    }
  }

  return urlSearchParams.toString();
}
