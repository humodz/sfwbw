import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'simpledotcss';
import { store } from './store';
import { App } from './App';
import './index.css';
import { HashRouter } from 'react-router-dom';

const container = document.body;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
);
