import { findRegisteredUser } from '../api/FindCustomer';

type EmailHandlerProps = (
  value: string,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setEmailErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const EmailValidationRegistr: EmailHandlerProps = async (
  value,
  email,
  setEmail,
  setEmailErr
) => {
  let flag = false;
  setEmail(value);

  // The regular expression assumes the syntax of the correct email address format
  const properlyFormat =
    /^([0-9A-Za-z]{1}(([0-9A-Za-z]*[.-0-9A-z]{1}[0-9A-Za-z]{1,})){1,}|([0-9A-Za-z]{1,}))@([0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,}$/;
  // The regular expression assumes no whitespace
  const whitespace = /\s+/;
  // The regular expression assumes that the “@” character is entered between the local part and the domain name
  const domainName =
    /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]{1,}))@)$/;
  // The regular expression assumes that enter domain name after “@”
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
    const findResult = await findRegisteredUser(value);
    setEmailErr(findResult);
  }
  return flag;
};

export default EmailValidationRegistr;
