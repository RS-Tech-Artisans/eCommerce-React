type PasswordValidationProps = (
  value: string,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setPasswordErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const PasswordValidation: PasswordValidationProps = (
  value,
  password,
  setPassword,
  setPasswordErr
) => {
  let flag = false;
  setPassword(value);
  const properlyFormat = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\S]{8,}/;
  const uppercaseLetter = /(?=.*[A-Z])/;
  const lowercaseLetter = /(?=.*[a-z])/;
  const digit = /(?=.*\d)/;
  const whitespace = /\s+/;

  if (!properlyFormat.test(String(value))) {
    setPasswordErr('Incorrect password format');
    if (value.length < 8) {
      setPasswordErr('Password must be at least 8 characters long');
    }
    if (!uppercaseLetter.test(String(value))) {
      setPasswordErr(
        'Password must contain at least one uppercase letter (A-Z)'
      );
    }
    if (!lowercaseLetter.test(String(value))) {
      setPasswordErr(
        'Password must contain at least one lowercase letter (a-z)'
      );
    }
    if (!digit.test(String(value).toLowerCase())) {
      setPasswordErr('Password must contain at least one digit (0-9)');
    }
    if (whitespace.test(String(value).toLowerCase())) {
      setPasswordErr('Please delete whitespace');
    }
    if (!value) setPasswordErr('Please fill out this field');
  } else {
    setPasswordErr('');
    flag = true;
  }
  return flag;
};

export default PasswordValidation;
