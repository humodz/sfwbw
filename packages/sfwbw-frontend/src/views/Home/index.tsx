import styles from './styles.module.css';

import React, { useState } from 'react';
import { FormButton } from '../../components/forms/FormButton';
import { useListGamesQuery } from '../../store/apiSlice';
import { useCurrentUser } from '../../store/hooks';
import { If } from '../../utils/jsx-conditionals';

import { GamePreview } from '../../components/GameSummary';

export function Home() {
  const user = useCurrentUser();

  const { data, isSuccess } = useListGamesQuery({});
  const games = data || [];

  return (
    <main>
      <SearchGamesForm />
      <section>
        {If(isSuccess) &&
          games.map((game) => (
            <GamePreview key={game.id} user={user} game={game} />
          ))}
      </section>
    </main>
  );
}

function SearchGamesForm() {
  const [searchField, setSearchField] = useState('name');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <form className={styles.searchGames} onSubmit={onSubmit}>
      <FormSelect
        selected={searchField}
        onChange={setSearchField}
        options={[
          { label: 'Name', value: 'name' },
          { label: 'Owner', value: 'owner' },
        ]}
      ></FormSelect>
      <input
        type="text"
        placeholder="Search games..."
        className={styles.searchQuery}
      ></input>
      <FormButton type="submit">Search</FormButton>
      <FormButton type="button">New Game</FormButton>
    </form>
  );
}

interface FormSelectProps {
  options: { label: string; value: string }[];
  selected?: string;
  onChange?: (newValue: string) => void;
}

export function FormSelect(props: FormSelectProps) {
  return (
    <select
      value={props.selected}
      onChange={(e) => props.onChange?.(e.target.value)}
    >
      {props.options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
