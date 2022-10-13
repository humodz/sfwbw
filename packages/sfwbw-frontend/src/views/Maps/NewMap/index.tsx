import { Tile, TileType } from '@sfwbw/sfwbw-core';
import React, { useRef, useState } from 'react';
import { FormButton } from '../../../components/forms/FormButton';
import { FormField } from '../../../components/forms/FormField';
import { useCreateMapMutation } from '../../../store/api';

export function NewMap() {
  const [name, setName] = useState('');
  const [columnsRaw, setColumnsRaw] = useState('');
  const [rowsRaw, setRowsRaw] = useState('');
  const [createMap, createMapResult] = useCreateMapMutation();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // TODO error if too small
    const columns = Number(columnsRaw) || 5;
    const rows = Number(rowsRaw) || 5;

    const tiles: Tile[][] = repeat(
      rows,
      repeat(columns, { type: TileType.PLAINS, player: 0 }),
    );

    tiles[0] = [
      { type: TileType.HQ, player: 1 },
      ...repeat(columns - 2, { type: TileType.PLAINS, player: 0 }),
      { type: TileType.HQ, player: 2 },
    ];

    await createMap({ name: name.trim(), tiles });
  };

  return (
    <div>
      <article>
        <h4>New Map</h4>

        <form onSubmit={onSubmit}>
          <FormField
            id="newmap-name"
            label="Name"
            type="text"
            value={name}
            setValue={setName}
            extras={{ required: true }}
          />

          <label htmlFor="newmap-cols">Size</label>
          <div className="flex items-center gap-2">
            <input
              value={columnsRaw}
              onChange={(e) => setColumnsRaw(e.target.value)}
              onInvalid={formErrorMessage('Please supply an integer.')}
              id="newmap-cols"
              name="newmap-cols"
              type="text"
              placeholder="columns"
              className="flex-1"
              pattern="\d+"
              required
            />
            by
            <input
              value={rowsRaw}
              onChange={(e) => setRowsRaw(e.target.value)}
              onInvalid={formErrorMessage('Please supply an integer.')}
              name="newmap-rows"
              type="text"
              placeholder="rows"
              className="flex-1"
              pattern="\d+"
              required
            />
          </div>
          <br />
          <FormButton
            className="block m-auto min-w-[50%]"
            type="submit"
            isLoading={createMapResult.isLoading}
          >
            Create
          </FormButton>
        </form>
      </article>
    </div>
  );
}

function formErrorMessage(message: string) {
  return (e: { target: any }) => e.target.setCustomValidity(message);
}

function repeat<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}
