import { useEffect, useState } from 'react';
import { FormButton } from '../FormButton';

interface Props {
  disabled?: boolean;
  isLoading?: boolean;
  searchTerm: string;
  onSearch?: (searchTerm: string) => void;
}

const classes = {
  container: 'mb-4 flex flex-wrap items-stretch gap-2',
  searchField: 'flex-1 m-0',
  searchButton: 'm-0 whitespace-nowrap',
};

export function SearchForm(props: Props) {
  const [searchTerm, setSearchTerm] = useState(props.searchTerm || '');

  useEffect(() => {
    setSearchTerm(props.searchTerm);
  }, [props.searchTerm]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSearch?.(searchTerm);
  };

  return (
    <form className={classes.container} onSubmit={onSubmit}>
      <input
        type="text"
        className={classes.searchField}
        disabled={props.disabled}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <FormButton
        type="submit"
        loading={props.isLoading}
        className={classes.searchButton}
      >
        Search
      </FormButton>
    </form>
  );
}
