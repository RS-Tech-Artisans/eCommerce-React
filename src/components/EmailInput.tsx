import React, { useEffect, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import EmailValidation from '../utils/validation/EmailValidation';
import BlurHandler from '../utils/validation/BlurHundler';
import { EmailInputProps } from '../utils/Interfaces';

const EmailInput: React.FC<EmailInputProps> = ({
  email,
  setEmail,
  emailErr,
  setEmailErr,
  setFormValid,
  passwordErr,
}) => {
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (emailErr || passwordErr) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailErr, passwordErr, setFormValid]);

  return (
    <div className="login-form_input-box">
      <input
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) {
            EmailValidation(e.target.value, email, setEmail, setEmailErr);
          }
        }}
        onBlur={(e) => {
          if (e.target instanceof HTMLInputElement) {
            BlurHandler(e.target.name, setTouched, setTouched);
          }
        }}
        name="email"
        type="text"
        placeholder="E-mail"
        autoComplete="off"
      />
      <MdEmail />
      {touched && emailErr && <div style={{ color: 'red' }}>{emailErr}</div>}
    </div>
  );
};

export default EmailInput;
