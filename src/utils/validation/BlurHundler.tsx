type BlurHandlerProps = (
  name: string,
  setEmailFill: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordFill: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const BlurHandler: BlurHandlerProps = (name, setEmailFill, setPasswordFill) => {
  let flag = false;
  switch (name) {
    case 'email':
      flag = true;
      setEmailFill(true);
      break;
    case 'password':
      flag = true;
      setPasswordFill(true);
      break;
  }
  return flag;
};

export default BlurHandler;
