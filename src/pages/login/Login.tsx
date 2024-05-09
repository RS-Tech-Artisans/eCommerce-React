import { useState, useEffect } from 'react';
import BlurHandler from './BlurHundler';
import EmailHundler from './EmailHundler';
import PasswordHundler from './PasswordHundler';
import { MdEmail } from 'react-icons/md';
import { FaLock } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('Please fill out this field');
  const [passwordErr, setPasswordErr] = useState('Please fill out this field');
  const [emailFill, setEmailFill] = useState(false);
  const [passwordFill, setPasswordFill] = useState(false);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (emailErr || passwordErr) {
      setFormValid(false);
    } else setFormValid(true);
  }, [emailErr, passwordErr]);

  return (
    <>
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input
            onInput={(e) => EmailHundler(e, email, setEmail, setEmailErr)}
            onBlur={(e) => BlurHandler(e, setEmailFill, setPasswordFill)}
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
            onInput={(e) =>
              PasswordHundler(e, password, setPassword, setPasswordErr)
            }
            onBlur={(e) => BlurHandler(e, setEmailFill, setPasswordFill)}
            type="password"
            name="password"
            placeholder="Password"
          />
          <FaLock />
        </div>
        {passwordFill && passwordErr && (
          <div style={{ color: 'red' }}>{passwordErr}</div>
        )}
        <div>
          <button disabled={!formValid} type="submit">
            Login
          </button>
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
