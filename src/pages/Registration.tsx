import { useState } from 'react';
import BlurHandler from '../utils/validation/BlurHundler';
import EmailValidation from '../utils/validation/EmailValidation';
import PasswordValidation from '../utils/validation/PasswordValidation';
import { MdEmail } from 'react-icons/md';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import './Registration.css';

export default function Registration() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('Please fill out this field');
  const [passwordErr, setPasswordErr] = useState('Please fill out this field');
  const [emailFill, setEmailFill] = useState(false);
  const [passwordFill, setPasswordFill] = useState(false);

  return (
    <>
      <form className="registration-form" action="">
        <h1>Registration</h1>
        <div className="registration-form_input-box">
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
        <div className="registration-form_input-box">
          <input
            onInput={(e) =>
              PasswordValidation(e, password, setPassword, setPasswordErr)
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
        <div className="registration-form_input-box">
          <input type="text" placeholder="First Name" required />
          <FaUserCircle />
        </div>
        <div className="registration-form_input-box">
          <input type="text" placeholder="Last Name" required />
          <FaUserCircle />
        </div>
        <div className="registration-form_input-box">
          <label htmlFor="date">Birthdate: </label>
          <div>
            <input type="date" id="date" name="birthdate" />
          </div>
        </div>
        <div className="registration-form_input-box">
          <p>Address fields:</p>
          <div>
            <label htmlFor="street">Street: </label>
            <input type="text" id="street" required />
          </div>
          <div>
            <label htmlFor="city">City: </label>
            <input type="text" id="city" required />
          </div>
          <div>
            <label htmlFor="postal-code">Postal code: </label>
            <input type="text" id="postal-code" required />
          </div>
          <div>
            <label htmlFor="country">Country: </label>
            <input type="text" id="country" required />
          </div>
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
}
