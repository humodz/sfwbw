import { useEffect } from 'react';
import { increment, incrementByAmount, selectCount } from './store/counterSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';

export function App() {
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