import { useState } from 'react';
import BlurHandler from './BlurHundler';
import EmailHundler from './EmailHundler';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState(``);
  const [emailErr, setEmailErr] = useState('Please fill out this field');
  const [emailFill, setEmailFill] = useState(false);

  return (
    <>
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input
            onInput={(e) => EmailHundler(e, email, setEmail, setEmailErr)}
            onBlur={(e) => BlurHandler(e, setEmailFill)}
            name="email"
            type="text"
            placeholder="E-mail"
            autoComplete="off"
          />
          <MdEmail />
        </div>
        {emailFill && emailErr && (
          <div style={{ color: 'red' }}>{emailErr}</div>
        )}
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
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
