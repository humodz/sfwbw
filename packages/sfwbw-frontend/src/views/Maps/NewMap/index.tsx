import { repeat, Tile, TileType } from '@sfwbw/sfwbw-core';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../../components/ErrorMessage';
import { FormButton } from '../../../components/forms/FormButton';
import { FormField } from '../../../components/forms/FormField';
import { useCreateMapMutation } from '../../../store/api';
import { useCurrentUser } from '../../../store/auth-slice';
import { isSuccessResponse } from '../../../utils';
import { formErrorMessage } from '../../../utils';

export function NewMap() {
  useCurrentUser({ requiresAuth: true });
  const navigate = useNavigate();
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
      repeat(columns, { type: TileType.PLAINS, player: 0, variation: 0 }),
    );

    tiles[0] = [
      { type: TileType.HQ, player: 1, variation: 0 },
      ...repeat(columns - 2, {
        type: TileType.PLAINS,
        player: 0,
        variation: 0,
      }),
      { type: TileType.HQ, player: 2, variation: 0 },
    ];

    const response = await createMap({
      name: name.trim(),
      tiles,
      units: new Map(),
    });

    if (isSuccessResponse(response)) {
      navigate(`/maps/@${response.data.id}/edit`);
    }
  };

  return (
    <div>
      <article>
        <h4>New Map</h4>

        <form onSubmit={onSubmit} autoComplete="off">
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
          <FormButton
            className="block mx-auto mb-0 min-w-[50%]"
            type="submit"
            isLoading={createMapResult.isLoading}
          >
            Create
          </FormButton>
          {createMapResult.isError && (
            <ErrorMessage error={createMapResult.error} />
          )}
        </form>
      </article>
    </div>
  );
}
