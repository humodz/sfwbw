import { useState, useEffect } from 'react';
import { FormField } from '../../components/forms/FormField';
import { PasswordField } from '../../components/forms/PasswordField';

import { icons } from '@sfwbw/sfwbw-assets';
import { Else, If } from '../../utils/jsx-conditionals';

import styles from './styles.module.css';
import { useRegisterMutation, useSignInMutation } from '../../store/apiSlice';


export function SignIn() {
  return (
    <main>
      <article>
        <div style={{ width: 'fit-content', margin: 'auto' }}>
        <h4 style={{ marginTop: '0.5rem' }}>Sign In</h4>
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

  const [signIn, { isLoading, error }] = useSignInMutation();

  const onSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await signIn({
      username,
      password,
    });

    console.log(response);
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
      email,
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


interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

function FormButton(props: FormButtonProps) {
  const buttonProps = { ...props, loading: undefined };

  return (
    <button disabled={props.loading} {...buttonProps}>
      {
        If(!props.loading) && (
          props.children
        ) || Else && (
          <LoadingIcon />
        )
      }
    </button>
  );
}


function LoadingIcon() {
  return (
    <img
      src={icons.loading}
      alt="Loading"
      className={styles.loading}
      style={{
        height: '20px',
        width: '20px',
      }}
    />
  );
}

interface ErrorMessageProps {
  children: string | JSX.Element;
}

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div
      style={{
        display: 'flex',
        borderLeft: '5px solid var(--code)',
        borderRadius: '2px',
        padding: '0.5rem',
        backgroundColor: 'var(--accent-bg)'
      }}
    >
      <img
        src={icons.error}
        alt="Error"
        style={{
          imageRendering: 'pixelated',
          height: '64px',
          width: '64px',
          borderRadius: 0,
          flexBasis: 0,
          flexGrow: 0,
        }}
      />
      <div
        style={{
          marginLeft: '1rem',
          flexGrow: 1,
        }}
      >
        {props.children}
      </div>
    </div>
  )
}