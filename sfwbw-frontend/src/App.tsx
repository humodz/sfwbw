import { useEffect } from 'react';
import { increment, incrementByAmount, selectCount } from './store/counterSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

export function App() {
  return (
    <>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/">Editor</a>
          <a href="https://example.com">Github</a>
        </nav>

        <h1>Super Famicom Wars by Web</h1>
        {/* <p>subtitle</p> */}
      </header>
      <main>
        <h2>Hello World</h2>
      </main>
      <footer>
      </footer>
    </>
  );
}

  export function App2() {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);

    useEffect(() => {
      const id = setInterval(() => {
        dispatch(increment());
      }, 1000);

      return () => clearInterval(id);
    }, []);

    const reset = () => {
      dispatch(incrementByAmount(-count));
    };

    return (
      <p onClick={reset}>Hello World {count}</p>
      );
    }