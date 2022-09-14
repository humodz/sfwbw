import { useState, useEffect } from 'react';
import { FormField } from '../../components/forms/FormField';
import { PasswordField } from '../../components/forms/PasswordField';

import { If } from '../../utils/jsx-conditionals';

import styles from './styles.module.css';
import { useRegisterMutation, useSignInMutation } from '../../store/apiSlice';
import { ErrorMessage } from '../../components/ErrorMessage';
import { FormButton } from '../../components/forms/FormButton';
import { setAccessToken } from '../../store/authSlice';
import { isErrorResponse } from '../../utils';
import { useAppDispatch } from '../../store/hooks';


export function SignIn() {
  return (
    <main>
      <article>
        <div className={styles.content}>
          <h4 className={styles.header}>Sign In</h4>
          <SignInForm />
        </div>
      </article>
      <article>
        <div className={styles.content}>
          <h4 className={styles.header}>New User?</h4>
          <RegisterForm />
        </div>
      </article>
    </main>
  );
}

function SignInForm() {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, { isLoading, error }] = useSignInMutation();

  const onSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await signIn({
      username,
      password,
    });

    if (isErrorResponse(response)) {
      return;
    }

    dispatch(setAccessToken(response.data.accessToken));
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
        <FormButton type="submit" loading={isLoading} style={{ width: '100%' }}>
          Sign In
        </FormButton>
      </div>

      {
        If(error) && (
          <ErrorMessage>
            {(error as any).data.message}
          </ErrorMessage>
        )
      }
    </form>
  );
}

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');

  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  useEffect(() => {
    if (password === passwordConfirmation && passwordConfirmationError) {
      setPasswordConfirmationError('');
    }
  }, [password, passwordConfirmation, passwordConfirmationError]);

  const [register, { isLoading, error }] = useRegisterMutation();

  const onRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError('Please type the same password');
      return;
    }

    const response = await register({
      username,
      password,
      email: email || null,
    });

    console.log(response);
  };

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
        label="e-mail (optional)"
        value={email}
        setValue={setEmail}
      />

      <div>
        <FormButton type="submit" loading={isLoading} style={{ width: '100%' }}>
          Register
        </FormButton>
      </div>

      {
        If(error) && (
          <ErrorMessage>
            {(error as any).data.message}
          </ErrorMessage>
        )
      }
    </form>
  );
}
