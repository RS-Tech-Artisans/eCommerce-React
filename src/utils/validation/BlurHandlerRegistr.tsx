type BlurHandlerRegistrProps = (
  name: string,
  setNameUserFill: React.Dispatch<React.SetStateAction<boolean>>,
  setLastNameUserFill: React.Dispatch<React.SetStateAction<boolean>>,
  setBirthdateFill: React.Dispatch<React.SetStateAction<boolean>>,
  setStreetFill: React.Dispatch<React.SetStateAction<boolean>>,
  setCityFill: React.Dispatch<React.SetStateAction<boolean>>,
  setCountryFill: React.Dispatch<React.SetStateAction<boolean>>,
  setPostalCodeFill: React.Dispatch<React.SetStateAction<boolean>>,
  setStreetFillBilling: React.Dispatch<React.SetStateAction<boolean>>,
  setCityFillBilling: React.Dispatch<React.SetStateAction<boolean>>,
  setCountryFillBilling: React.Dispatch<React.SetStateAction<boolean>>,
  setPostalCodeFillBilling: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const BlurHandlerRegistr: BlurHandlerRegistrProps = (
  name,
  setNameUserFill,
  setLastNameUserFill,
  setBirthdateFill,
  setStreetFill,
  setCityFill,
  setCountryFill,
  setPostalCodeFill,
  setStreetFillBilling,
  setCityFillBilling,
  setCountryFillBilling,
  setPostalCodeFillBilling
) => {
  let flag = false;
  switch (name) {
    case 'name-user':
      flag = true;
      setNameUserFill(true);
      break;
    case 'last-name-user':
      flag = true;
      setLastNameUserFill(true);
      break;
    case 'birthdate':
      flag = true;
      setBirthdateFill(true);
      break;
    case 'street':
      flag = true;
      setStreetFill(true);
      break;
    case 'city':
      flag = true;
      setCityFill(true);
      break;
    case 'country':
      flag = true;
      setCountryFill(true);
      break;
    case 'postal-code':
      flag = true;
      setPostalCodeFill(true);
      break;
    case 'streetforBillingAdress':
      flag = true;
      setStreetFillBilling(true);
      break;
    case 'cityforBillingAdress':
      flag = true;
      setCityFillBilling(true);
      break;
    case 'countryforBillingAdress':
      flag = true;
      setCountryFillBilling(true);
      break;
    case 'postal-codeforBillingAdress':
      flag = true;
      setPostalCodeFillBilling(true);
      break;
  }
  return flag;
};

export default BlurHandlerRegistr;
