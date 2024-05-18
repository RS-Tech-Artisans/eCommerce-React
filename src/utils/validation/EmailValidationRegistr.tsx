type EmailHandlerProps = (
  value: string,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setEmailErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const EmailValidationRegistr: EmailHandlerProps = (
  value,
  email,
  setEmail,
  setEmailErr
) => {
  let flag = false;
  setEmail(value);

  const properlyFormat =
    /^([0-9A-Za-z]{1}(([0-9A-Za-z]*[.-0-9A-z]{1}[0-9A-Za-z]{1,})){1,}|([0-9A-Za-z]{1,}))@([0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,}$/;
  const whitespace = /\s+/;
  const domainName =
    /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]{1,}))@)$/;
  const charAt =
    /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]{1,})))$/;

  if (!properlyFormat.test(String(value))) {
    setEmailErr('Incorrect email format');
    if (charAt.test(String(value))) {
      setEmailErr('Please enter “@” between local part and domain name');
    }
    if (domainName.test(String(value))) {
      setEmailErr('Please enter domain name after “@”');
    }
    if (whitespace.test(String(value))) {
      setEmailErr('Please delete whitespace');
    }
    if (!value) setEmailErr('Please fill out this field');
  } else {
    setEmailErr('');
    flag = true;
  }
  return flag;
};

export default EmailValidationRegistr;
