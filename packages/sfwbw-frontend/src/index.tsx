import 'simpledotcss';
import './simpledotcss-tweaks.css';
import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './App';
import { HashRouter } from 'react-router-dom';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root not found');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
);
