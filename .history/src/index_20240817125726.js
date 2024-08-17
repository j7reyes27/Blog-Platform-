import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


const container = document.getElementById('root');
const root = createRoot(container);
const cors = require("cors")

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
