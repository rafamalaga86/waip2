import { Avatar } from '@mui/material';
import { IoGameController } from 'react-icons/io5';

export function PlayingIcon() {
  return (
    <Avatar className="playing warning-background" sx={{ fontSize: 27 }}>
      <IoGameController />
    </Avatar>
  );
}
