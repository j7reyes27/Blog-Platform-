import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
