import { Box, Button, Divider, FormControlLabel, Grid, Switch, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { useSwitch } from './hooks/useSwitch';

export function SearchGameSection({
  initialGameTitle,
  setGameTitleToSearch,
  searchOptions,
  setOptionsToSearch,
  setLoading,
}: {
  initialGameTitle: string;
  setGameTitleToSearch: Function;
  searchOptions: SearchOptions;
  setOptionsToSearch: Function;
  setLoading: Function;
}) {
  const [gameTitle, setGameTitle] = useState(initialGameTitle);

  // Switches initialization
  let toggleIncludeNoCoverGames, toggleIncludeDLCs, toggleIncludeEditions;
  [searchOptions.includeNoCoverGames, toggleIncludeNoCoverGames] = useSwitch(false);
  [searchOptions.includeDLCs, toggleIncludeDLCs] = useSwitch(false);
  [searchOptions.includeEditions, toggleIncludeEditions] = useSwitch(false);

  return (
    <Grid component="section" className="section-search" container>
      <Grid xs={12} md={4}>
        <Box
          component="form"
          noValidate
          id="search-form"
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            console.log('Escupe: llega');
            event.preventDefault();
            setLoading(true);
            setGameTitleToSearch(gameTitle);
            setOptionsToSearch(searchOptions);
          }}
          sx={{ mt: 1 }}
        >
          <TextField
            required
            fullWidth
            label="Search The Game to Import"
            id="game_name"
            name="game_name"
            onChange={event => {
              setGameTitle(event.target.value);
            }}
            value={gameTitle}
            // InputProps={}
          />
        </Box>
      </Grid>
      <Grid
        xs={12}
        md={8}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          mt: { xs: 3, md: 0 },
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={searchOptions.includeEditions}
              onChange={() => {
                toggleIncludeEditions();
              }}
              name="include-editions"
            />
          }
          label="With Editions"
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <FormControlLabel
          control={
            <Switch
              checked={searchOptions.includeDLCs}
              onChange={() => {
                toggleIncludeDLCs();
              }}
              name="include-dlcs"
            />
          }
          label="With DLCs"
        />
        <Divider orientation="vertical" variant="middle" flexItem />
        <FormControlLabel
          control={
            <Switch
              checked={searchOptions.includeNoCoverGames}
              onChange={() => {
                toggleIncludeNoCoverGames();
              }}
              name="include-games-with-covers"
            />
          }
          label="Without Covers"
        />
        <Button form="search-form" type="submit" variant="contained">
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
