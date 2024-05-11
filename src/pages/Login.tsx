import { useLogin } from '../utils/Login';

export default function Login() {
  const { loginResult, error, handleLogin } = useLogin();

  return (
    <div>
      <h1>Login page</h1>
      <button onClick={handleLogin}>Login</button>
      {loginResult && <p>Login successful!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
