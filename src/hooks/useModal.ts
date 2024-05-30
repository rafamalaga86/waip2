import { useState } from 'react';

export function useModal(initialState = false): [boolean, () => void, () => void] {
  const [open, setOpen] = useState(initialState);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return [open, handleOpen, handleClose];
}
