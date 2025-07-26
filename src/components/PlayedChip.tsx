import { Chip } from '@mui/material';

export function PlayedChipBeaten({ label }: { label: string }) {
  return <Chip label={label} className="success" />;
}

export function PlayedChipPlaying({ label }: { label: string }) {
  return <Chip label={label} className="warning" />;
}

export function PlayedChipAbandoned({ label }: { label: string }) {
  return <Chip label={label} className="danger" />;
}
