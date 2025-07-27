import { Chip } from '@mui/material';
import { AbandonedIcon } from './icons/AbandonedIcon';
import { BeatenIcon } from './icons/BeatenIcon';
import { PlayingIcon } from './icons/PlayingIcon';

interface Props {
  label: string;
  className: string;
  hasIcon: boolean;
}

export function PlayedChipBeaten({ label, className, hasIcon }: Props) {
  return (
    <Chip
      label={label}
      className={`${className} ${hasIcon ? 'hasIcon' : ''} success`}
      icon={<BeatenIcon />}
    />
  );
}

export function PlayedChipPlaying({ label, className, hasIcon }: Props) {
  return (
    <Chip
      label={label}
      className={`${className} ${hasIcon ? 'hasIcon' : ''}  warning`}
      icon={<PlayingIcon />}
    />
  );
}

export function PlayedChipAbandoned({ label, className, hasIcon }: Props) {
  return (
    <Chip
      label={label}
      className={`${className} ${hasIcon ? 'hasIcon' : ''} danger`}
      icon={<AbandonedIcon />}
    />
  );
}
