import { useState, useEffect } from 'react';
import BlurHandler from '../utils/validation/BlurHundler';
import EmailValidation from '../utils/validation/EmailValidation';
import PasswordValidation from '../utils/validation/PasswordValidation';
import TogglePassInput from '../utils/validation/TogglePassInput';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaUnlock } from 'react-icons/fa';
import { useLogin } from '../utils/Login';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const { loginResult, error, handleLogin } = useLogin();
  const iconPassive = <FaLock />;
  const iconActive = <FaUnlock />;

  const [type, setType] = useState('password');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('Please fill out this field');
  const [passwordErr, setPasswordErr] = useState('Please fill out this field');
  const [emailFill, setEmailFill] = useState(false);
  const [passwordFill, setPasswordFill] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const [passInputClasses, setPassInputClasses] =
    useState('pass-input-passive');
  const [toggleIcon, setToggleIcon] = useState(iconPassive);
  const [toggleIconClasses, setToggleIconClasses] = useState(
    'pass-toggle-icon-passive'
  );

  useEffect(() => {
    if (emailErr || passwordErr) {
      setFormValid(false);
    } else setFormValid(true);
  }, [emailErr, passwordErr]);

  return (
    <>
      <form className="login-form" action="">
        <h1>Login</h1>
        <div className="login-form_input-box">
          <input
            onInput={(e) => EmailValidation(e, email, setEmail, setEmailErr)}
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
        <div className="login-form_input-box">
          <input
            className={passInputClasses}
            onInput={(e) =>
              PasswordValidation(e, password, setPassword, setPasswordErr)
            }
            onBlur={(e) => BlurHandler(e, setEmailFill, setPasswordFill)}
            type={type}
            name="password"
            placeholder="Password"
          />
          <span
            onClick={(e) =>
              TogglePassInput(
                e,
                type,
                setType,
                setToggleIcon,
                iconActive,
                setPassInputClasses,
                setToggleIconClasses,
                iconPassive
              )
            }
            className={`toggle ${toggleIconClasses}`}
          >
            {toggleIcon}
          </span>
        </div>
        {passwordFill && passwordErr && (
          <div style={{ color: 'red' }}>{passwordErr}</div>
        )}
        <div>
          <button
            disabled={!formValid}
            type="button"
            onClick={() => handleLogin(email, password)}
          >
            Login
          </button>
          <div>
            <p>
              Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>

            <div style={{ color: 'green' }}>
              {loginResult && <p>Login successful!</p>}
            </div>
            <div style={{ color: 'red' }}>
              {error && <p>Error: {error.message}</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
