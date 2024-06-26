type BlurHandlerUserProps = (
  name: string,
  setNameUserFill: React.Dispatch<React.SetStateAction<boolean>>,
  setLastNameUserFill: React.Dispatch<React.SetStateAction<boolean>>,
  setBirthdateFill: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const BlurHandlerUser: BlurHandlerUserProps = (
  name,
  setNameUserFill,
  setLastNameUserFill,
  setBirthdateFill
) => {
  let flag = false;
  switch (name) {
    case 'information-first-name':
      flag = true;
      setNameUserFill(true);
      break;
    case 'information-last-name':
      flag = true;
      setLastNameUserFill(true);
      break;
    case 'information-birth':
      flag = true;
      setBirthdateFill(true);
      break;
  }
  return flag;
};

export default BlurHandlerUser;
