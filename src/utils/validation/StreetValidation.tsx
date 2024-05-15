type StreetValidationProps = (
  e: React.FormEvent<HTMLInputElement>,
  street: string,
  setStreet: React.Dispatch<React.SetStateAction<string>>,
  setStreetErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const StreetValidation: StreetValidationProps = (
  e,
  street,
  setStreet,
  setStreetErr
) => {
  if (e.target instanceof HTMLInputElement) {
    setStreet(e.target.value);
    const properlyFormat = /[\w\W]{1,}/;

    if (!properlyFormat.test(String(e.target.value))) {
      setStreetErr('Must contain at least one character');
    } else {
      setStreetErr('');
    }
  }
};

export default StreetValidation;
