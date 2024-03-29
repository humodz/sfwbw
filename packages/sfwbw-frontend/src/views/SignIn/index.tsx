import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../components/ErrorMessage';
import { FormButton } from '../../components/forms/FormButton';
import { FormField } from '../../components/forms/FormField';
import { PasswordField } from '../../components/forms/PasswordField';
import { useRegisterMutation, useSignInMutation } from '../../store/api';
import {
  selectRedirectAfterLogin,
  setAccessToken,
  setRedirectAfterLogin,
} from '../../store/auth-slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { isErrorResponse, RtkMutationResponse } from '../../utils';

type SignInResponse = RtkMutationResponse<typeof useSignInMutation>;

export function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const redirectAfterLogin = useAppSelector(selectRedirectAfterLogin);

  const afterSignIn = async (response: SignInResponse) => {
    if (isErrorResponse(response)) {
      return;
    }

    dispatch(setAccessToken(response.data.accessToken));
    if (redirectAfterLogin) {
      navigate(-1);
      dispatch(setRedirectAfterLogin(false));
    } else {
      navigate('/');
    }
  };

  return (
    <main className="m-auto grid grid-cols-1 md:grid-cols-2 gap-x-4 items-start">
      <article>
        <h4>Sign In</h4>
        <SignInForm afterSignIn={afterSignIn} />
      </article>
      <article>
        <h4>New User?</h4>
        <RegisterForm afterSignIn={afterSignIn} />
      </article>
    </main>
  );
}

interface SignInProps {
  afterSignIn?: (response: SignInResponse) => void;
}

function SignInForm(props: SignInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [signIn, { isLoading, error }] = useSignInMutation({
    fixedCacheKey: 'sign-in',
  });

  const onSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await signIn({
      username,
      password,
    });

    props.afterSignIn?.(response);
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
        <FormButton type="submit" isLoading={isLoading} className="w-full mb-0">
          Sign In
        </FormButton>
      </div>

      {error && <ErrorMessage error={error}></ErrorMessage>}
    </form>
  );
}

interface RegisterProps {
  afterSignIn?: (response: SignInResponse) => void;
}

function RegisterForm(props: RegisterProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');

  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');

  useEffect(() => {
    if (password === passwordConfirmation && passwordConfirmationError) {
      setPasswordConfirmationError('');
    }
  }, [password, passwordConfirmation, passwordConfirmationError]);

  const [register, registerInfo] = useRegisterMutation();
  const [signIn, signInInfo] = useSignInMutation({ fixedCacheKey: 'sign-in' });

  const isLoading = registerInfo.isLoading || signInInfo.isLoading;
  const error = registerInfo.error || signInInfo.error;

  const onRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setPasswordConfirmationError('Please type the same password');
      return;
    }

    const registerResponse = await register({
      username,
      password,
      email: email || null,
    });

    if (isErrorResponse(registerResponse)) {
      return;
    }

    const signInResponse = await signIn({
      username,
      password,
    });

    props.afterSignIn?.(signInResponse);
  };

  return (
    <form onSubmit={onRegister} autoComplete="off">
      <FormField
        id="register-username"
        label={
          <>
            Username
            <br />
            (only letters, numbers and <code>. _ -</code>)
          </>
        }
        value={username}
        setValue={setUsername}
        extras={{
          required: true,
          minLength: 4,
          pattern: '^[-_.a-zA-Z0-9]+$',
          disabled: isLoading,
        }}
      />

      <PasswordField
        id="register-password"
        label="Password (at least 8 chars)"
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
        extras={{ required: true, disabled: isLoading }}
      />

      <FormField
        id="register-email"
        type="email"
        label="e-mail (optional)"
        value={email}
        setValue={setEmail}
        extras={{ disabled: isLoading }}
      />

      <div>
        <FormButton type="submit" isLoading={isLoading} className="w-full mb-0">
          Register
        </FormButton>
      </div>

      {error && <ErrorMessage error={error}></ErrorMessage>}
    </form>
  );
}
