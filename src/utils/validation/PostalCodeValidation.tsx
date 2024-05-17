type PostalCodeValidationProps = (
  value: string,
  postalCode: string,
  setPostalCode: React.Dispatch<React.SetStateAction<string>>,
  sePostalCodeErr: React.Dispatch<React.SetStateAction<string>>
) => void;

const PostalCodeValidation: PostalCodeValidationProps = (
  value,
  postalCode,
  setPostalCode,
  sePostalCodeErr
) => {
  let flag = false;
  setPostalCode(value);
  const properlyFormat = /^[0-9]{5}((-[0-9]{4})|(-[A-Z]{4}))?$/;

  if (!properlyFormat.test(String(value))) {
    sePostalCodeErr('Please use the format XXXXX or XXXXX-YYYY');
    if (!value) sePostalCodeErr('Please fill out this field');
  } else {
    sePostalCodeErr('');
    flag = true;
  }
  return flag;
};

export default PostalCodeValidation;
