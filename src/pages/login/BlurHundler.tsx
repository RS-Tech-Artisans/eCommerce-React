export default function BlurHandler(
  e: React.FocusEvent,
  setEmailFill: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordFill: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (e.target instanceof HTMLInputElement) {
    const elem: HTMLInputElement | null = e.target;

    switch (elem?.name) {
      case 'email':
        setEmailFill(true);
        break;
      case 'password':
        setPasswordFill(true);
        break;
    }
  }
}
