import { Avatar } from '@mui/material';
import { FaThumbsDown } from 'react-icons/fa6';

export function AvatarAbandonedIcon() {
  return (
    <Avatar className="abandoned danger-background color-white" sx={{ fontSize: 23 }}>
      <FaThumbsDown />
    </Avatar>
  );
}
