import { Button } from 'react-bootstrap';
import { useLogin } from '../utils/Login';

export default function LogoutButton() {
  //const { isLoggedIn, handleLogout } = useLogin();
  const { handleLogout } = useLogin();

  return (
    <div>
      {/* {isLoggedIn ? <Button onClick={handleLogout}>Logout</Button> : <></>} */}
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
