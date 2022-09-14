import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { Editor } from './views/Editor';
import { Home } from './views/Home';
import { SignIn } from './views/SignIn';

export function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/sign-in">Sign In</Link>
          <Link to="/editor">Editor</Link>
          <a target="_blank" href="https://example.com">Github</a>
        </nav>

        <h1>Super Famicom Wars by Web</h1>
        {/* <p>subtitle</p> */}
      </header>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/editor" element={<Editor />}/>
        <Route path="*" element={<Navigate to="/" />}/>
      </Routes>
      <footer>
      </footer>
    </>
  );
}
