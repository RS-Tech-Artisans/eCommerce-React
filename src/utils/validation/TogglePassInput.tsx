type ToggleProps = (
  type: string,
  setType: React.Dispatch<React.SetStateAction<string>>,
  setToggleIcon: React.Dispatch<React.SetStateAction<JSX.Element>>,
  iconActive: JSX.Element,
  setPassInputClasses: React.Dispatch<React.SetStateAction<string>>,
  setToggleIconClasses: React.Dispatch<React.SetStateAction<string>>,
  iconPassive: JSX.Element
) => void;

const TogglePassInput: ToggleProps = (
  type,
  setType,
  setToggleIcon,
  iconActive,
  setPassInputClasses,
  setToggleIconClasses,
  iconPassive
) => {
  let flag = false;
  if (type === 'password') {
    flag = true;
    setType('text');
    setToggleIcon(iconActive);
    setPassInputClasses('pass-input-active');
    setToggleIconClasses('pass-toggle-icon-active');
  } else if (type === 'text') {
    flag = true;
    setType('password');
    setToggleIcon(iconPassive);
    setPassInputClasses('pass-input-passive');
    setToggleIconClasses('pass-toggle-icon-passive');
  }
  return flag;
};

export default TogglePassInput;
