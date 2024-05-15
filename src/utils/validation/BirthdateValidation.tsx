type BirthdateValidationProps = (
  e: React.FormEvent<HTMLInputElement>,
  birthdate: string,
  setBirthdate: React.Dispatch<React.SetStateAction<string>>,
  setBirthdateErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const BirthdateValidation: BirthdateValidationProps = (
  e,
  birthdate,
  setBirthdate,
  setBirthdateErr
) => {
  if (e.target instanceof HTMLInputElement) {
    setBirthdate(e.target.value);

    const currentDate = new Date();
    const currentMonth =
      currentDate.getMonth() + 1 >= 10
        ? currentDate.getMonth() + 1
        : `0${currentDate.getMonth() + 1}`;
    const currentDay =
      currentDate.getDate() >= 10
        ? currentDate.getDate()
        : `0${currentDate.getDate()}`;
    const minimumAge = `${currentDate.getFullYear() - 14}-${currentMonth}-${currentDay}`;
    const maximumAge = `${currentDate.getFullYear() + 100}-${currentMonth}-${currentDay}`;

    if (!(minimumAge <= e.target.value)) {
      setBirthdateErr('The minimum age is 14 years');
      if (!e.target.value)
        setBirthdateErr('Please fill in this field correctly');
    } else if (!(maximumAge >= e.target.value)) {
      setBirthdateErr('The maximum possible age is exceeded');
      if (!e.target.value)
        setBirthdateErr('Please fill in this field correctly');
    } else {
      setBirthdateErr('');
    }
  }
};

export default BirthdateValidation;