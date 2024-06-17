import { Box, Button, Divider, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { useState } from 'react';
import { useSwitch } from '../hooks/useSwitch';
import { QuestionIcon } from './icons/QuestionIcon';

export function SearchGameSection({
  setGameTitleToSearch,
  initialSearchOptions,
  setOptionsToSearch,
  setLoading,
  searchLabel,
  initialGameTitle,
}: {
  setGameTitleToSearch: Function;
  initialSearchOptions: SearchOptions;
  setOptionsToSearch: Function;
  setLoading: Function;
  searchLabel: string;
  initialGameTitle?: string;
}) {
  const [gameTitle, setGameTitle] = useState(initialGameTitle ?? '');

  // Switches initialization
  let toggleIncludeNoCoverGames, toggleIncludeDLCs, toggleIncludeEditions;
  [initialSearchOptions.includeNoCoverGames, toggleIncludeNoCoverGames] = useSwitch(false);
  [initialSearchOptions.includeDLCs, toggleIncludeDLCs] = useSwitch(false);
  [initialSearchOptions.includeEditions, toggleIncludeEditions] = useSwitch(false);

  return (
    <Grid component="section" className="section-search" container>
      <Grid xs={12} md={4}>
        <Box
          className="section-search__form"
          component="form"
          noValidate
          id="search-form"
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (gameTitle === '') {
              return;
            }
            setLoading(true);
            setGameTitleToSearch(gameTitle);
            setOptionsToSearch(initialSearchOptions);
          }}
          sx={{ mt: 1, display: 'flex', flexDirection: 'row' }}
        >
          <TextField
            required
            fullWidth
            autoComplete="off"
            label={searchLabel}
            id="game_name"
            name="game_name"
            onChange={event => {
              setGameTitle(event.target.value);
            }}
            value={gameTitle}
          />

          <Box className="section-search__question">
            <QuestionIcon tooltip="If you enter a IGDB ID, it will search by id" />
          </Box>
        </Box>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          width: { xs: '100%', md: 'auto' },
          ml: { md: 'auto' },
          alignItems: 'center',
          mt: { xs: 3, md: 0 },
          // justifyContent: 'flex-end',
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={initialSearchOptions.includeEditions}
              sx={{ position: 'relative', left: '3px' }}
              onChange={() => {
                toggleIncludeEditions();
              }}
              name="include-editions"
            />
          }
          label="Editions"
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <FormControlLabel
          control={
            <Switch
              checked={initialSearchOptions.includeDLCs}
              sx={{ position: 'relative', left: '3px' }}
              onChange={() => {
                toggleIncludeDLCs();
              }}
              name="include-dlcs"
            />
          }
          label="DLCs"
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <FormControlLabel
          control={
            <Switch
              checked={initialSearchOptions.includeNoCoverGames}
              sx={{ position: 'relative', left: '3px' }}
              onChange={() => {
                toggleIncludeNoCoverGames();
              }}
              name="include-games-with-covers"
            />
          }
          label="Without Covers"
        />
        <Button sx={{ ml: 'auto' }} form="search-form" type="submit" variant="contained">
          Search
        </Button>
      </Box>
    </Grid>
  );
}
