type CountryValidationProps = (
  value: string,
  country: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setCountryErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const CountryValidation: CountryValidationProps = (
  value,
  country,
  setCountry,
  setCountryErr
) => {
  let flag = false;
  setCountry(value);
  if (!value.length) setCountryErr('Please select from the list');
  else {
    flag = true;
    setCountryErr('');
  }
  return flag;
};

export default CountryValidation;
