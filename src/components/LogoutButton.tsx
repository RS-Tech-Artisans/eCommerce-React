import { Button } from 'react-bootstrap';
import { useLogin } from '../utils/Login';

export default function LogoutButton() {
  const { handleLogout } = useLogin();

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
