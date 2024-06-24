import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../utils/Login';
import { useSession } from '../utils/SessionContext';
import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import './Login.css';

const Login: React.FC = () => {
  const { token } = useSession();
  const { loginResult, error, handleLogin } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <>
      <form className="login-form" action="">
        <h1>Login</h1>
        <EmailInput
          email={email}
          setEmail={setEmail}
          emailErr={emailErr}
          setEmailErr={setEmailErr}
          setFormValid={setFormValid}
          passwordErr={passwordErr}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          passwordErr={passwordErr}
          setPasswordErr={setPasswordErr}
          setFormValid={setFormValid}
          emailErr={emailErr}
        />
        <div>
          <button
            disabled={!formValid}
            type="button"
            onClick={() => {
              handleLogin(email, password);
            }}
          >
            Login
          </button>
          <div>
            <p>
              Don&apos;t have an account?{' '}
              <Link className="register-link" to="/register">
                Register
              </Link>
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
};

export default Login;
