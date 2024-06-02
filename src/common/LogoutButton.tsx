import { Button } from 'react-bootstrap';
import { useLogin } from '../utils/Login';
import { RiLogoutBoxRLine } from 'react-icons/ri';

export default function LogoutButton() {
  const { handleLogout } = useLogin();

  return (
    <div>
      <Button className="btn-dark btn-lg" onClick={handleLogout}>
        <RiLogoutBoxRLine />
      </Button>
    </div>
  );
}
