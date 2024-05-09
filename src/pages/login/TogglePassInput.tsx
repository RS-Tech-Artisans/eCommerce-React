export default function TogglePassInput(
  e: React.MouseEvent,
  type: string,
  setType: React.Dispatch<React.SetStateAction<string>>,
  setToggleIcon: React.Dispatch<React.SetStateAction<JSX.Element>>,
  iconActive: JSX.Element,
  setPassInputClasses: React.Dispatch<React.SetStateAction<string>>,
  setToggleIconClasses: React.Dispatch<React.SetStateAction<string>>,
  iconPassive: JSX.Element
) {
  if (type === 'password') {
    setType('text');
    setToggleIcon(iconActive);
    setPassInputClasses('login-form_pass-input-active');
    setToggleIconClasses('login-form_toggle-icon-active');
  } else {
    setType('password');
    setToggleIcon(iconPassive);
    setPassInputClasses('login-form_pass-passive');
    setToggleIconClasses('login-form_toggle-icon-passive');
  }
}
