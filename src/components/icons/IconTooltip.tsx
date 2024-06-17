import { IconButton, Tooltip } from '@mui/material';
import { ReactNode } from 'react';

export function IconTooltip({ tooltip, children }: { tooltip: string; children: ReactNode }) {
  return (
    <Tooltip title={tooltip}>
      <IconButton className="hid-aura">{children}</IconButton>
    </Tooltip>
  );
}
