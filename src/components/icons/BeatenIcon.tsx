import { Avatar } from '@mui/material';
import { FaFlagCheckered } from 'react-icons/fa6';

export function BeatenIcon() {
  return (
    <Avatar className="beaten success-background color-white" sx={{ fontSize: 24 }}>
      <FaFlagCheckered />
    </Avatar>
  );
}
