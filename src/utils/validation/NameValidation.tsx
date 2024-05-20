type NameValidationProps = (
  value: string,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setNameErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const NameValidation: NameValidationProps = (
  value,
  name,
  setName,
  setNameErr
) => {
  let flag = false;
  setName(value);
  // The regular expression assumes at least one character and no special characters or numbers
  const properlyFormat =
    /^((([a-zA-Z]{1,}[ .-]{1}[a-zA-Z]{1,}){1,})|([a-zA-Z]{1,}))$/;

  if (!properlyFormat.test(String(value))) {
    setNameErr(
      'Field must contain at least one character and no special characters or numbers'
    );
  } else {
    setNameErr('');
    flag = true;
  }
  return flag;
};

export default NameValidation;
