import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

export default function Login() {
  return (
    <>
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="email" placeholder="E-mail" required />
          <MdEmail />
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" required />
          <FaLock />
        </div>
        <div>
          <button type="submit">Login</button>
          <div>
            <p>
              Don&apos;t have an account? <a href="#">Register</a>
            </p>
          </div>
        </div>
      </form>
    </>
  );
}
