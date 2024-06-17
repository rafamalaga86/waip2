import { FaQuestionCircle } from 'react-icons/fa';
import { IconTooltip } from 'src/components/icons/IconTooltip';

export function QuestionIcon({ tooltip }: { tooltip: string }) {
  return (
    <IconTooltip tooltip={tooltip}>
      <FaQuestionCircle />
    </IconTooltip>
  );
}
