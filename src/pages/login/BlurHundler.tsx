type BlurHandlerProps = (
  e: React.FocusEvent,
  setEmailFill: React.Dispatch<React.SetStateAction<boolean>>,
  setPasswordFill: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const BlurHandler: BlurHandlerProps = (e, setEmailFill, setPasswordFill) => {
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
};

export default BlurHandler;
