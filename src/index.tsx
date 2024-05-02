import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.createRoot(root).render(<App />);

if (process.env.NODE_ENV === 'production') {
  console.log('Running in production mode', process.env.NODE_ENV);
} else {
  console.log('Running in development mode', process.env.NODE_ENV);
}
