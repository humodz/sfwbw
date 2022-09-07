import { useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { increment, incrementByAmount, selectCount } from './store/counterSlice';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { Editor } from './views/Editor';
import { Home } from './views/Home';

export function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/editor">Editor</Link>
          <a href="https://example.com">Github</a>
        </nav>

        <h1>Super Famicom Wars by Web</h1>
        {/* <p>subtitle</p> */}
      </header>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/editor" element={<Editor />}/>
      </Routes>
      <footer>
      </footer>
    </>
  );
}
