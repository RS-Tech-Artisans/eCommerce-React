type EmailHandlerProps = (
  e: React.FormEvent<HTMLInputElement>,
  email: string,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setEmailErr: React.Dispatch<React.SetStateAction<string>>
) => void;

import findCustomer from '../FindCustomer';

const EmailValidation: EmailHandlerProps = async (
  e,
  email,
  setEmail,
  setEmailErr
) => {
  if (e.target instanceof HTMLInputElement) {
    setEmail(e.target.value);
    const properlyFormat =
      /^(([0-9A-Za-z]{1}[.-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]{1,}))@([0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,}$/;
    const whitespace = /\s+/;
    const domainName =
      /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]{1,}))@)$/;
    const charAt =
      /^((([0-9A-Za-z]{1}[-0-9A-z]{1,}[0-9A-Za-z]{1})|([0-9A-Za-z]{1,})))$/;

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
      const findResult = await findCustomer(e.target.value);
      setEmailErr(findResult);
    }
  }
};

export default EmailValidation;
