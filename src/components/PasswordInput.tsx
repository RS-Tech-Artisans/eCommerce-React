import React, { useState, useEffect } from 'react';
import { FaLock, FaUnlock } from 'react-icons/fa';
import PasswordValidation from '../utils/validation/PasswordValidation';
import TogglePassInput from '../utils/validation/TogglePassInput';
import BlurHandler from '../utils/validation/BlurHundler';
import { PasswordInputProps } from '../utils/Interfaces';

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  passwordErr,
  setPasswordErr,
  setFormValid,
  emailErr,
}) => {
  const [type, setType] = useState('password');
  const iconPassive = <FaLock />;
  const iconActive = <FaUnlock />;
  const [toggleIcon, setToggleIcon] = useState(iconPassive);
  const [passInputClasses, setPassInputClasses] =
    useState('pass-input-passive');
  const [toggleIconClasses, setToggleIconClasses] = useState(
    'pass-toggle-icon-passive'
  );
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
        className={passInputClasses}
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) {
            PasswordValidation(
              e.target.value,
              password,
              setPassword,
              setPasswordErr
            );
          }
        }}
        onBlur={(e) => {
          if (e.target instanceof HTMLInputElement) {
            BlurHandler(e.target.name, setTouched, setTouched);
          }
        }}
        type={type}
        name="password"
        placeholder="Password"
      />
      <span
        onClick={() =>
          TogglePassInput(
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
      {touched && passwordErr && (
        <div style={{ color: 'red' }}>{passwordErr}</div>
      )}
    </div>
  );
};

export default PasswordInput;
