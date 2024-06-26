import { useLogin } from '../utils/Login';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import './LogoutButton.css';

export default function LogoutButton() {
  const { handleLogout } = useLogin();

  return (
    <div>
      <button className="btn-dark logout-button" onClick={handleLogout}>
        <RiLogoutBoxRLine />
      </button>
    </div>
  );
}
