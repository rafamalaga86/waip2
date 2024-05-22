import { ReactNode, createContext, useState } from 'react';

export const Context = createContext({
  openErrorToast: false,
  setOpenErrorToast: (boolean: boolean) => {},
  messageErrorToast: '',
  setMessageErrorToast: (message: string) => {},
});

export function ContextProvider({ children }: { children: ReactNode }) {
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [messageErrorToast, setMessageErrorToast] = useState('');
  return (
    <Context.Provider
      value={{
        openErrorToast,
        setOpenErrorToast,
        messageErrorToast,
        setMessageErrorToast,
      }}
    >
      {children}
    </Context.Provider>
  );
}
