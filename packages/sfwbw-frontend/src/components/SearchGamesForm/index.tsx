import { useEffect, useState } from 'react';
import { FormButton } from '../forms/FormButton';
import { Link } from 'react-router-dom';

interface SearchGamesFormProps {
  disabled?: boolean;
  loading?: boolean;
  searchTerm: string;
  onSearch?: (searchTerm: string) => void;
}

const classes = {
  container: 'mb-4 flex flex-wrap items-stretch gap-2 sm:flex-row flex-col',
  searchField: 'flex-1 m-0',
  searchButton: 'm-0 whitespace-nowrap',
};

export function SearchGamesForm(props: SearchGamesFormProps) {
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
        placeholder="Search games..."
        className={classes.searchField}
        disabled={props.disabled}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <FormButton
        type="submit"
        loading={props.loading}
        className={classes.searchButton}
      >
        Search
      </FormButton>
    </form>
  );
}
