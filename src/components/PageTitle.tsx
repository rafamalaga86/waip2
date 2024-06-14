import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  alignCenter?: boolean;
}

export function PageTitle({ children, alignCenter }: Props) {
  return (
    <Typography
      color="primary"
      component="h4"
      variant="h4"
      className={'title-font ' + (alignCenter ? 'text-align-center' : '')}
    >
      {children}
    </Typography>
  );
}
