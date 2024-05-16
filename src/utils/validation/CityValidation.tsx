type CityValidationProps = (
  e: React.FormEvent<HTMLInputElement>,
  city: string,
  setCity: React.Dispatch<React.SetStateAction<string>>,
  setCityErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const CityValidation: CityValidationProps = (e, name, setCity, setCityErr) => {
  if (e.target instanceof HTMLInputElement) {
    setCity(e.target.value);
    const properlyFormat =
      /^((([-a-zA-Z]{1,}[ .]{1}[-a-zA-Z]{1,}){1,})|([A-Za-z]{1}[-a-zA-Z .]{1,}[a-zA-Z]{1,})|([a-z]{1,}))$/;

    if (!properlyFormat.test(String(e.target.value))) {
      setCityErr(
        'Field must contain at least one character and no special characters or numbers'
      );
      if (!e.target.value) setCityErr('Please fill out this field');
    } else {
      setCityErr('');
    }
  }
};

export default CityValidation;
