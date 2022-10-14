import React from 'react';
import { FormField } from '../../components/forms/FormField';
import { useCurrentUser } from '../../store/auth-slice';

export function Profile() {
  const user = useCurrentUser({ requiresAuth: true });

  const updateUser = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <main style={{ width: 'fit-content', margin: 'auto' }}>
      <article>
        <form onSubmit={updateUser} autoComplete="off">
          <FormField
            id="profile-username"
            label={'Username'}
            value={user?.username}
            extras={{ disabled: true }}
          />

          <p>Work in Progress</p>
        </form>
      </article>
    </main>
  );
}
