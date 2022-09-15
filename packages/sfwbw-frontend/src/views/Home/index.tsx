import { useCurrentUser } from '../../store/hooks';

export function Home() {
  const user = useCurrentUser();

  return (
    <main>
      <p>Welcome to Home</p>
      <p>{JSON.stringify(user)}</p>
    </main>
  );
}