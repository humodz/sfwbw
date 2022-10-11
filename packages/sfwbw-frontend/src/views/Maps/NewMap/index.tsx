import React, { useState } from 'react';
import { FormButton } from '../../../components/forms/FormButton';
import { FormField } from '../../../components/forms/FormField';

export function NewMap() {
  const [name, setName] = useState('');
  const [columns, setColumns] = useState('');
  const [rows, setRows] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('ok');
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
            extras={{ required: true }}
          />

          <label htmlFor="newmap-cols">Size</label>
          <div className="flex items-center gap-2">
            <input
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
              name="newmap-rows"
              type="text"
              placeholder="rows"
              className="flex-1"
              pattern="\d+"
              required
            />
          </div>
          <br />
          <FormButton className="block m-auto min-w-[50%]" type="submit">
            Create
          </FormButton>
        </form>
      </article>
    </div>
  );
}
