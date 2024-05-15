type CountryValidationProps = (
  e: React.FormEvent<HTMLSelectElement>,
  country: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  setCountryErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const CountryValidation: CountryValidationProps = (
  e,
  country,
  setCountry,
  setCountryErr
) => {
  if (e.target instanceof HTMLSelectElement) {
    setCountry(e.target.value);

    if (!e.target.value.length) setCountryErr('Please select from the list');
    else setCountryErr('');
  }
};

export default CountryValidation;
