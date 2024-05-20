type BirthdateValidationProps = (
  value: string,
  birthdate: string,
  setBirthdate: React.Dispatch<React.SetStateAction<string>>,
  setBirthdateErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const BirthdateValidation: BirthdateValidationProps = (
  value,
  birthdate,
  setBirthdate,
  setBirthdateErr
) => {
  let flag = false;

  setBirthdate(value);

  const currentDate = new Date();
  const currentMonth =
    currentDate.getMonth() + 1 >= 10
      ? currentDate.getMonth() + 1
      : `0${currentDate.getMonth() + 1}`;
  const currentDay =
    currentDate.getDate() >= 10
      ? currentDate.getDate()
      : `0${currentDate.getDate()}`;
  const MINIMUM_AGE_REQUIRED = 14;
  const MAXIMUM_ALLOWED_AGE = 100;
  const minimumAge = `${currentDate.getFullYear() - MINIMUM_AGE_REQUIRED}-${currentMonth}-${currentDay}`;
  const maximumAge = `${currentDate.getFullYear() - MAXIMUM_ALLOWED_AGE}-${currentMonth}-${currentDay}`;

  if (value.length !== 10)
    setBirthdateErr('Please fill in this field correctly');
  else if (!(new Date(minimumAge) >= new Date(value))) {
    setBirthdateErr(`The minimum age is ${MINIMUM_AGE_REQUIRED} years`);
  } else if (new Date(maximumAge) >= new Date(value)) {
    setBirthdateErr('The maximum possible age is exceeded');
  } else {
    setBirthdateErr('');
    flag = true;
  }

  return flag;
};

export default BirthdateValidation;
