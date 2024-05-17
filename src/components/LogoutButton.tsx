import { Button } from 'react-bootstrap';
import { useLogin } from '../utils/Login';

export default function LogoutButton() {
  const { isLoggedIn, handleLogout } = useLogin();
  console.log(`issss: ${isLoggedIn}`);

  return (
    <div>
      {isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : <></>}
    </div>
  );
}
