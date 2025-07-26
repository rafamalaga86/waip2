import { Chip } from '@mui/material';

export function PlayedChipBeaten({ username }: { username: string }) {
  return <Chip label={`${username} finished this game already`} className="success" />;
}

export function PlayedChipPlaying({ username }: { username: string }) {
  return <Chip label={`${username} is playing now`} className="warning" />;
}

export function PlayedChipAbandoned({ username }: { username: string }) {
  return <Chip label={`${username} abandoned this game already`} className="danger" />;
}
