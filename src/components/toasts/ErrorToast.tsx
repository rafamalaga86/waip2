import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import { Context } from 'src/components/contexts/Context';

export function ErrorToast() {
  const { openErrorToast, setOpenErrorToast, messageErrorToast } = useContext(Context);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorToast(false);
  };

  return (
    <Snackbar open={openErrorToast} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: '100%' }}>
        {messageErrorToast}
      </Alert>
    </Snackbar>
  );
}
