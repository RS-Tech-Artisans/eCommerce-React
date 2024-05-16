type PasswordValidationProps = (
  e: React.FormEvent<HTMLInputElement>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setPasswordErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const PasswordValidation: PasswordValidationProps = (
  e,
  password,
  setPassword,
  setPasswordErr
) => {
  if (e.target instanceof HTMLInputElement) {
    setPassword(e.target.value);
    const properlyFormat = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[\S]{8,}$/;
    const uppercaseLetter = /(?=.*[A-Z])/;
    const lowercaseLetter = /(?=.*[a-z])/;
    const digit = /(?=.*\d)/;
    const whitespace = /\s+/;

    if (!properlyFormat.test(String(e.target.value))) {
      setPasswordErr('Incorrect password format');
      if (e.target.value.length < 8) {
        setPasswordErr('Password must be at least 8 characters long');
      }
      if (!uppercaseLetter.test(String(e.target.value))) {
        setPasswordErr(
          'Password must contain at least one uppercase letter (A-Z)'
        );
      }
      if (!lowercaseLetter.test(String(e.target.value))) {
        setPasswordErr(
          'Password must contain at least one lowercase letter (a-z)'
        );
      }
      if (!digit.test(String(e.target.value).toLowerCase())) {
        setPasswordErr('Password must contain at least one digit (0-9)');
      }
      if (whitespace.test(String(e.target.value).toLowerCase())) {
        setPasswordErr('Please delete whitespace');
      }
      if (!e.target.value) setPasswordErr('Please fill out this field');
    } else {
      setPasswordErr('');
    }
  }
};

export default PasswordValidation;
