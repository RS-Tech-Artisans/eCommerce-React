import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div>
      <div className="error-container">
        <p className="error_number">404 Route</p>
        <p className="error_text">Not Found</p>
        <p>The requested URL was not found on this server.</p>
        <Link to="/" className="button button-add">
          to main page
        </Link>
      </div>
    </div>
  );
}
