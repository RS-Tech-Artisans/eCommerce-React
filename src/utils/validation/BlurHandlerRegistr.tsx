type BlurHandlerRegistrProps = (
  e: React.FocusEvent,
  setNameUserFill: React.Dispatch<React.SetStateAction<boolean>>,
  setLastNameUserFill: React.Dispatch<React.SetStateAction<boolean>>,
  setBirthdateFill: React.Dispatch<React.SetStateAction<boolean>>,
  setStreetFill: React.Dispatch<React.SetStateAction<boolean>>,
  setCityFill: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const BlurHandlerRegistr: BlurHandlerRegistrProps = (
  e,
  setNameUserFill,
  setLastNameUserFill,
  setBirthdateFill,
  setStreetFill,
  setCityFill
) => {
  if (e.target instanceof HTMLInputElement) {
    const elem: HTMLInputElement | null = e.target;

    switch (elem?.name) {
      case 'name-user':
        setNameUserFill(true);
        break;
      case 'last-name-user':
        setLastNameUserFill(true);
        break;
      case 'birthdate':
        setBirthdateFill(true);
        break;
      case 'street':
        setStreetFill(true);
        break;
      case 'city':
        setCityFill(true);
        break;
    }
  }
};

export default BlurHandlerRegistr;
