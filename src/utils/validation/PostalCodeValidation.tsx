type PostalCodeValidationProps = (
  e: React.FormEvent<HTMLInputElement>,
  postalCode: string,
  setPostalCode: React.Dispatch<React.SetStateAction<string>>,
  sePostalCodeErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const PostalCodeValidation: PostalCodeValidationProps = (
  e,
  postalCode,
  setPostalCode,
  sePostalCodeErr
) => {
  if (e.target instanceof HTMLInputElement) {
    setPostalCode(e.target.value);
    const properlyFormat = /^[0-9]{5}((-[0-9]{4})|(-[A-Z]{4}))?$/;

    if (!properlyFormat.test(String(e.target.value))) {
      sePostalCodeErr('Please use the format XXXXX or XXXXX-YYYY');
      if (!e.target.value) sePostalCodeErr('Please fill out this field');
    } else {
      sePostalCodeErr('');
    }
  }
};

export default PostalCodeValidation;
