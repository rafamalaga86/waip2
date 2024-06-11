import { IconButton, Tooltip } from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';

export function QuestionIcon({ tooltip }: { tooltip: string }) {
  return (
    <Tooltip title={tooltip}>
      <IconButton className="hid-aura">
        <FaQuestionCircle />
      </IconButton>
    </Tooltip>
  );
}
