import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ErrorFeedback } from 'src/components/ErrorFeedback';
import { PlayedStatus } from 'src/enums/business/playedEnums';

type Props = {
  playingState: PlayedStatus;
  handlePlayingState: (event: React.MouseEvent<HTMLElement>, newPlayingState: PlayedStatus) => void;
  statusError: string | null;
};

export default function PlayedStatusButtonGroup({
  playingState,
  handlePlayingState,
  statusError,
}: Props) {
  return (
    <>
      <ToggleButtonGroup
        style={{ marginTop: 3 }}
        fullWidth
        className={statusError ? 'error-outline' : ''}
        value={playingState}
        exclusive
        onChange={handlePlayingState}
        aria-label="playingState"
      >
        <ToggleButton value={PlayedStatus.beaten} aria-label="game beaten">
          Beaten!
        </ToggleButton>
        <ToggleButton value={PlayedStatus.abandoned} aria-label="game abandoned">
          Abandoned
        </ToggleButton>
        <ToggleButton value={PlayedStatus.playing} aria-label="game playing now">
          Playing now
        </ToggleButton>
      </ToggleButtonGroup>
      <ErrorFeedback>{statusError}</ErrorFeedback>
    </>
  );
}
