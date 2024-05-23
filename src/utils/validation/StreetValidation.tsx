type StreetValidationProps = (
  value: string,
  street: string,
  setStreet: React.Dispatch<React.SetStateAction<string>>,
  setStreetErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const StreetValidation: StreetValidationProps = (
  value,
  street,
  setStreet,
  setStreetErr
) => {
  let flag = false;
  setStreet(value);
  // The regular expression assumes that the syntax must consist of at least 1 character, can contain uppercase letters (A-Z), lowercase letters (a-z), numbers (0-9), and special characters in between;
  const properlyFormat = /^[A-Za-z0-9!?,# $%-^&*@.]+$/;

  if (!properlyFormat.test(String(value))) {
    setStreetErr('Field must contain at least one character');
  } else {
    setStreetErr('');
    flag = true;
  }
  return flag;
};

export default StreetValidation;
