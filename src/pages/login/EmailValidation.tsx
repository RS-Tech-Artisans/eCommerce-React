type EmailHandlerProps = (
  e: React.FormEvent<HTMLInputElement>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setEmailErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const EmailValidation: EmailHandlerProps = (
  e,
  email,
  setEmail,
  setEmailErr
) => {
  if (e.target instanceof HTMLInputElement) {
    setEmail(email);

    const properlyFormat =
      /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]))@([0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
    const whitespace = /\s+/;
    const domainName =
      /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]))@)$/;
    const charAt =
      /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z])))$/;

    if (!properlyFormat.test(String(e.target.value).toLowerCase())) {
      setEmailErr('Incorrect email format');
      if (charAt.test(String(e.target.value).toLowerCase())) {
        setEmailErr('Please enter “@” between local part and domain name');
      }
      if (domainName.test(String(e.target.value).toLowerCase())) {
        setEmailErr('Please enter domain name after “@”');
      }
      if (whitespace.test(String(e.target.value).toLowerCase())) {
        setEmailErr('Please delete whitespace');
      }
      if (!e.target.value) setEmailErr('Please fill out this field');
    } else {
      setEmailErr('');
    }
  }
};

export default EmailValidation;
