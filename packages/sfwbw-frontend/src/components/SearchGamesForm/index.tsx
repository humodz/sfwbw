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
  container: 'mb-8 flex flex-wrap items-stretch gap-2 sm:flex-row flex-col',
  input: 'flex-1 m-0',
  buttons: 'flex flex-wrap items-stretch gap-2',
  button: 'flex-1 m-0 whitespace-nowrap',
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
        className={classes.input}
        disabled={props.disabled}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className={classes.buttons}>
        <FormButton
          type="submit"
          loading={props.loading}
          className={classes.button}
        >
          Search
        </FormButton>
        <Link to="/new-game" role="button" className={classes.button}>
          New Game
        </Link>
      </div>
    </form>
  );
}
