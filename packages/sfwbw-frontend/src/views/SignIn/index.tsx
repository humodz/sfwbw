import { useState, useEffect } from 'react';
import { FormField } from '../../components/forms/FormField';
import { PasswordField } from '../../components/forms/PasswordField';

export function SignIn() {
  return (
    <main>
      <article>
        <div style={{ width: 'fit-content', margin: 'auto' }}>
          <SignInForm />
        </div>
      </article>
      <article>
        <div style={{ width: 'fit-content', margin: 'auto' }}>
          <h4 style={{ marginTop: '0.5rem' }}>New User?</h4>
          <RegisterForm />
        </div>
      </article>
    </main>
  );
}

function SignInForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    alert('sign in: ' + username + ' ' + password);
  };

  return (
    <form onSubmit={onSignIn}>
      <FormField
        id="signin-username"
        label={'Username'}
        value={username}
        setValue={setUsername}
        extras={{ required: true }}
      />

      <PasswordField
        id="signin-password"
        label="Password"
        value={password}
        setValue={setPassword}
        extras={{ required: true }}
      />

      <div>
        <button type="submit" style={{ width: '100%' }}>Sign In</button>
      </div>
    </form>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');

  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const onRegister = (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError('Please match the password');
      return;
    }

    alert('register: ' + username + ' ' + password + ' ' + email);
  };

  useEffect(() => {
    if (password === passwordConfirmation && passwordConfirmationError) {
      setPasswordConfirmationError('');
    }
  }, [password, passwordConfirmation, passwordConfirmationError]);

  return (
    <form onSubmit={onRegister}>
      <FormField
        id="register-username"
        label={<>Username<br />(only letters, numbers and the following: . _ -)</>}
        value={username}
        setValue={setUsername}
        extras={{ required: true, minLength: 4, pattern: '^[-_.a-zA-Z0-9]+$' }}
      />

      <PasswordField
        id="register-password"
        label="Password (at least 8 characters)"
        value={password}
        setValue={setPassword}
        extras={{ required: true, minLength: 8 }}
      />

      <PasswordField
        id="register-password-confirmation"
        label="Confirm password"
        value={passwordConfirmation}
        setValue={setPasswordConfirmation}
        errorMessage={passwordConfirmationError}
        extras={{ required: true }}
      />

      <FormField
        id="register-email"
        type="email"
        label="e-mail (Optional)"
        value={email}
        setValue={setEmail}
      />

      <div>
        <button type="submit" style={{ width: '100%' }}>Register</button>
      </div>
    </form>
  );
}


