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
  // The regular expression assumes that the password must be at least 8 characters long, contain at least one uppercase letter (A-Z), one lowercase letter, and one number (0-9);
  const properlyFormat = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\S]{8,}/;
  // The regular expression assumes that the password must contain at least one uppercase letter (A-Z)
  const uppercaseLetter = /(?=.*[A-Z])/;
  // The regular expression assumes that the password must contain at least one lowercase letter (a-z)
  const lowercaseLetter = /(?=.*[a-z])/;
  // The regular expression assumes that the password must contain at least one digit (0-9)
  const digit = /(?=.*\d)/;
  // The regular expression assumes no whitespace
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
    if (!value) setPasswordErr('Please fill out this field');
  } else {
    setPasswordErr('');
    flag = true;
  }
  if (whitespace.test(String(value).toLowerCase())) {
    setPasswordErr('Please delete whitespace');
  }

  return flag;
};

export default PasswordValidation;
