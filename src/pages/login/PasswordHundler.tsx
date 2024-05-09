export default function PasswordHundler(
  e: React.FormEvent<HTMLInputElement>,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>,
  setPasswordErr: React.Dispatch<React.SetStateAction<string>>
) {
  if (e.target instanceof HTMLInputElement) {
    setPassword(password);

    const uppercaseLetter = /(?=.*[A-Z])/;
    const lowercaseLetter = /(?=.*[a-z])/;
    const digit = /(?=.*\d)/;
    const specialChar = /(?=.*[!@#$%^&*])/;
    const whitespace = /\s+/;

    if (e.target.value.length < 8) {
      setPasswordErr('Password must be at least 8 characters long');
      if (!specialChar.test(String(e.target.value).toLowerCase())) {
        setPasswordErr(
          'Password must contain at least one special character (e.g., !@#$%^&*)'
        );
      }
      if (!uppercaseLetter.test(String(e.target.value))) {
        setPasswordErr(
          'Password must contain at least one uppercase letter (A-Z)'
        );
      }
      if (!lowercaseLetter.test(String(e.target.value).toLowerCase())) {
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
    if (e.target.value.length > 16) {
      setPasswordErr('Password must be at leasno more 16 characters long');
    }
  }
}
