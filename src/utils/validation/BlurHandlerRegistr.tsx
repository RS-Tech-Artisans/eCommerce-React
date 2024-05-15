type BlurHandlerRegistrProps = (
  e: React.FocusEvent,
  setNameUserFill: React.Dispatch<React.SetStateAction<boolean>>
) => void;

const BlurHandlerRegistr: BlurHandlerRegistrProps = (e, setNameUserFill) => {
  if (e.target instanceof HTMLInputElement) {
    const elem: HTMLInputElement | null = e.target;

    switch (elem?.name) {
      case 'name-user':
        setNameUserFill(true);
        break;
    }
  }
};

export default BlurHandlerRegistr;
