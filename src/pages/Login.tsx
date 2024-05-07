import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function Login() {
  return (
    <>
      <h1>Login page</h1>
      <Link to="/">
        <Button>Login</Button>
      </Link>
      <Link to="/registration">
        <Button>Sig-in</Button>
      </Link>
    </>
  );
}



