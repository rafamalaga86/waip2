'use client';
import { Box, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { CoverSize } from 'src/enums/business/IGDBEnums/gameEnums';
import { titleAdjustment } from 'src/lib/helpers';
import { GameCardLite } from 'src/shared_components/GameCardLite';
import { IGDBImage } from 'src/shared_components/IGDBImage';
import { SearchGameSection } from 'src/shared_components/SearchGameSection';
import { QuestionIcon } from 'src/shared_components/icons/QuestionIcon';
import { ImportGamesCardActions } from '../import-process/ImportGamesCardActions';

type Props = {
  keyword?: string;
};

export function SearchPage({ keyword }: Props) {
  const searchOptions = {
    includeNoCoverGames: false,
    includeDLCs: false,
    includeEditions: false,
  };
  const [loading, setLoading] = useState(true);
  const [gameTitleToSearch, setGameTitleToSearch] = useState(keyword);
  const [optionsToSearch, setOptionsToSearch] = useState(searchOptions);
  const [searchedGames, setSearchedGames] = useState<any>([]);
  return (
    <>
      <section className="section-title">
        <div className="section-title__pre">
          <h5>Searching games: </h5>
        </div>
        <Typography component="h4" variant="h4" color="primary">
          <span className="title-font">{keyword}</span>
        </Typography>
      </section>
      <SearchGameSection
        searchOptions={searchOptions}
        setGameTitleToSearch={setGameTitleToSearch}
        setOptionsToSearch={setOptionsToSearch}
        setLoading={setLoading}
      />
      <Divider sx={{ mt: 3, mb: 3 }} />

      {loading && <h5>Cargando</h5>}
      {!loading && (
        <>
          {searchedGames.errorMessage && <h5>{searchedGames.errorMessage}</h5>}
          {!searchedGames.games.length && !searchedGames.errorMessage && <h5>No games found</h5>}
          {!!searchedGames.games.length && (
            <h5 className="mb-3">
              Found <strong>{searchedGames.games.length}</strong> games
            </h5>
          )}
          <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
            {searchedGames.games.map((game: IgdbSearchedGame) => {
              const unixDate = game.first_release_date;
              const year = unixDate ? '(' + new Date(unixDate * 1000).getFullYear() + ')' : '';

              const [fontSize, extraClasses] = titleAdjustment(game.name);
              const titleStyles = { p: 1, mt: 1, mb: 'auto', textAlign: 'center', fontSize };

              return (
                <GameCardLite
                  game={game}
                  key={game.id}
                  className="GameCardLite"
                  imgElement={
                    <IGDBImage
                      size={CoverSize.medium}
                      stringId={game.cover?.image_id}
                      description={game.name + ' cover'}
                    />
                  }
                >
                  <Box sx={titleStyles} className={extraClasses + ' title-font'}>
                    {game.name}
                  </Box>
                  <small className="text-align-center">
                    {!!year && <>{year} - </>}
                    <a className="color-white" href={game.url}>
                      <Tooltip title="IGDB ID">
                        <span className="mini-chip igdb-background-color">{game.id}</span>
                      </Tooltip>
                    </a>
                  </small>
                  {game.platforms && (
                    <Box className="GameCardLite__Question">
                      <QuestionIcon tooltip={game.platforms.map(item => item.name).join(', ')} />
                    </Box>
                  )}
                  <ImportGamesCardActions
                    game={game}
                    gameToImport={gameToImport}
                    importGame={importGame}
                  />
                </GameCardLite>
              );
            })}
          </Stack>
        </>
      )}
    </>
  );
}
