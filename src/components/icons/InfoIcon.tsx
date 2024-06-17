import { FaInfoCircle } from 'react-icons/fa';
import { IconTooltip } from 'src/components/icons/IconTooltip';

export function InfoIcon({ tooltip }: { tooltip: string }) {
  return (
    <IconTooltip tooltip={tooltip}>
      <FaInfoCircle />
    </IconTooltip>
  );
}
