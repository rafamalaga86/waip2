import { IconButton, Tooltip } from '@mui/material';
import { FaQuestionCircle } from 'react-icons/fa';

export function QuestionTooltip({ text }: { text: string }) {
  return (
    <Tooltip title={text}>
      <IconButton className="hid-aura">
        <FaQuestionCircle />
      </IconButton>
    </Tooltip>
  );
}
