type NameValidationProps = (
  e: React.FormEvent<HTMLInputElement>,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setNameErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const NameValidation: NameValidationProps = (e, name, setName, setNameErr) => {
  if (e.target instanceof HTMLInputElement) {
    setName(e.target.value);
    const properlyFormat = /^(([A-Z]{1}[a-z]{1,})|([A-Z]{1}))$/;

    if (!properlyFormat.test(String(e.target.value))) {
      setNameErr(
        'Field must contain at least one character and no special characters or numbers'
      );
      if (!e.target.value) setNameErr('Please fill out this field');
    } else {
      setNameErr('');
    }
  }
};

export default NameValidation;
