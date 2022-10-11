import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../../components/forms/FormField';
import { useCurrentUser } from '../../store/authSlice';

export function Profile() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
    }
  }, [navigate, currentUser]);

  const updateUser = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <main style={{ width: 'fit-content', margin: 'auto' }}>
      <article>
        <form onSubmit={updateUser}>
          <FormField
            id="profile-username"
            label={'Username'}
            value={currentUser?.username}
            extras={{ disabled: true }}
          />

          <p>Work in Progress</p>
        </form>
      </article>
    </main>
  );
}
