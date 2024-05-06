import ReactDOM from 'react-dom/client';
import App from './App';
import 'normalize.css/normalize.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.createRoot(root).render(<App />);
