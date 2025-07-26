import { Avatar } from '@mui/material';
import { FaThumbsDown } from 'react-icons/fa6';

export function AbandonedIcon() {
  return (
    <Avatar className="abandoned danger-background color-white" sx={{ fontSize: 23 }}>
      <FaThumbsDown />
    </Avatar>
  );
}
