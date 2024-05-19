import { useState } from 'react';
import { useRegistration } from '../utils/Registration';

export default function Registration() {
  const { loginResult, error, handleRegistration } = useRegistration();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await handleRegistration(email, password);
  };

  return (
    <div>
      <h1>Registration page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      {loginResult && <p>Registration successful!</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
