type CityValidationProps = (
  value: string,
  city: string,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  setCityErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const CityValidation: CityValidationProps = (
  value,
  name,
  setCity,
  setCityErr
) => {
  let flag = false;
  setCity(value);
  const properlyFormat =
    /^((([a-zA-Z]{1,}[ .-]{1}[a-zA-Z]{1,}){1,})|([a-zA-Z]{1,}))$/;

  if (!properlyFormat.test(String(value))) {
    setCityErr(
      'Field must contain at least one character and no special characters or numbers'
    );
    if (!value) setCityErr('Please fill out this field');
  } else {
    setCityErr('');
    flag = true;
  }

  return flag;
};

export default CityValidation;
