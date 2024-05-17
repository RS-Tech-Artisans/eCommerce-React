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
  const properlyFormat =
    /^(([A-Za-z0-9]{1,}([!,?# $%-^&*@.]{1}[0-9a-zA-Z]{1,}){1,})|([A-Za-z0-9]{1,}))$/;

  if (!properlyFormat.test(String(value))) {
    setStreetErr('Must contain at least one character');
  } else {
    setStreetErr('');
    flag = true;
  }
  return flag;
};

export default StreetValidation;
