import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import { FormButton } from '../forms/FormButton';
import { Link } from 'react-router-dom';

interface SearchGamesFormProps {
  disabled?: boolean;
  loading?: boolean;
  searchTerm: string;
  onSearch?: (searchTerm: string) => void;
}

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
    <form className={styles.searchGames} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search games..."
        className={styles.searchQuery}
        disabled={props.disabled}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className={styles.searchGamesButtons}>
        <FormButton type="submit" loading={props.loading}>
          Search
        </FormButton>
        <Link to="/new-game" role="button">
          New Game
        </Link>
      </div>
    </form>
  );
}
