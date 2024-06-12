import { Typography } from '@mui/material';
import { ReactNode } from 'react';

export function ErrorFeedback({ children, sx }: { children: ReactNode; sx?: Object }) {
  return (
    <Typography className="error-feedback" sx={sx}>
      {children}
    </Typography>
  );
}
