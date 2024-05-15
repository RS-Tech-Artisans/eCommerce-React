type ToggleProps = (
  e: React.MouseEvent,
  type: string,
  setType: React.Dispatch<React.SetStateAction<string>>,
  setToggleIcon: React.Dispatch<React.SetStateAction<JSX.Element>>,
  iconActive: JSX.Element,
  setPassInputClasses: React.Dispatch<React.SetStateAction<string>>,
  setToggleIconClasses: React.Dispatch<React.SetStateAction<string>>,
  iconPassive: JSX.Element
) => void;

const TogglePassInput: ToggleProps = (
  e,
  type,
  setType,
  setToggleIcon,
  iconActive,
  setPassInputClasses,
  setToggleIconClasses,
  iconPassive
) => {
  if (type === 'password') {
    setType('text');
    setToggleIcon(iconActive);
    setPassInputClasses('pass-input-active');
    setToggleIconClasses('pass-toggle-icon-active');
  } else {
    setType('password');
    setToggleIcon(iconPassive);
    setPassInputClasses('pass-input-passive');
    setToggleIconClasses('pass-toggle-icon-passive');
  }
};

export default TogglePassInput;
