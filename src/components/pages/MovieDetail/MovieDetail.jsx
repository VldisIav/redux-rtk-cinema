import React from "react";
import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from "../../../services/kinopoiskApi";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ErrorMessage from "../../ui/ErrorMessage";
import { ArrowBack, Language, Movie } from "@mui/icons-material";
import MovieCard from "../../ui/MovieCard/MovieCard";
import VideoPlayer from "../../ui/VideoPlayer/VideoPlayer";
import { Link } from "@mui/material";
const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);
  console.log("Sequels and Prequels Data:", responseSequelsAndPrequels.data);

  if (
    responseFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (responseFilm.error || responseStaff.error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: { md: 2 } }}>
        <Grid item md={4} sm={12}>
          <img
            src={responseFilm.data.posterUrl}
            alt={responseFilm.data.nameRu}
            width="270px"
          />
        </Grid>

        <Grid item md={6} sm={12}>
          <Grid container>
            <Grid item xs={2}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid>

            <Grid xs={4} item alignContent="center">
              <Typography variant="h5">{responseFilm.data.nameRu}</Typography>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={6}>
              <Typography>Year</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{responseFilm.data.year}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>Country</Typography>
              <Grid>
                {responseFilm.data.countries.map(({ country }) => (
                  <Typography key={country}>{country}</Typography>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography>Genres</Typography>
              <Grid>
                {responseFilm.data.genres.map(({ genre }) => (
                  <Typography key={genre}>{genre}</Typography>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography>Режиссеры</Typography>
              <Grid>
                {responseStaff.data
                  .filter(el => el.professionText === "Режиссеры")
                  .map(({ nameRu }) => (
                    <Typography key={nameRu}>{nameRu}</Typography>
                  ))}
              </Grid>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Время</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {responseFilm.data.filmLength} (мин)
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom>Описание</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {responseFilm.data.description
                  ? responseFilm.data.description
                  : "Описание отсутствует"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography variant="h6">В главных ролях</Typography>
          {responseStaff.data
            .filter(el => el.professionText === "Актеры")
            .slice(0, 10)
            .map(({ nameRu, staffId }) => (
              <div key={nameRu}>
                <Link component={RouterLink} to={`/actor/${staffId}`}>
                  {nameRu}
                </Link>
              </div>
            ))}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12}>
          <ButtonGroup variant="outlined" size="small">
            <Button
              target="_blank"
              href={responseFilm.data.webUrl}
              endIcon={<Language />}
            >
              Kinopoisk
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
              endIcon={<Movie />}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}></Grid>
        <Typography variant="h5">Смотреть онлайн</Typography>
        <VideoPlayer />
      </Grid>
      {responseSequelsAndPrequels.data && (
        <Stack alignItems="center">
          <Typography gutterBottom variant="h5">
            Сиквелы и приквелы
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            {responseSequelsAndPrequels.data.map(el => (
              <MovieCard key={el.filmId} movie={el} reload />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default MovieDetail;
