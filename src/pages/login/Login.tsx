import { useState, useEffect } from 'react';
import BlurHandler from './BlurHundler';
import EmailHundler from './EmailHundler';
import PasswordHundler from './PasswordHundler';
import TogglePassInput from './TogglePassInput';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaUnlock } from 'react-icons/fa';
import './Login.css';

export default function Login() {
  const iconPassive = <FaLock />;
  const iconActive = <FaUnlock />;

  const [type, setType] = useState('password');

  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('Please fill out this field');
  const [passwordErr, setPasswordErr] = useState('Please fill out this field');
  const [emailFill, setEmailFill] = useState(false);
  const [passwordFill, setPasswordFill] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const [passInputClasses, setPassInputClasses] = useState(
    'login-form_pass-passive'
  );
  const [toggleIcon, setToggleIcon] = useState(iconPassive);
  const [toggleIconClasses, setToggleIconClasses] = useState(
    'login-form_toggle-icon-passive'
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
        <div className="login-form_input-box">
          <input
            className={passInputClasses}
            onInput={(e) =>
              PasswordHundler(e, password, setPassword, setPasswordErr)
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
