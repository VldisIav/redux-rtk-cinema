import React from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { useGetStaffByIdQuery } from "../../../services/kinopoiskApi";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ErrorMessage from "../../ui/ErrorMessage";
import { ArrowBack } from "@mui/icons-material";
import { Link } from "@mui/material";

const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      <Grid container pt={1} spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={data.posterUrl} alt="actor" style={{ width: "200px" }} />
        </Grid>

        <Grid itrm xs={12} md={8}>
          <Stack flexDirection="row">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            ></Button>
            <Stack flexDirection="column">
              <Typography variant="h5">{data.nameRu}</Typography>
              <Typography>{data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Typography gutterBottom variant="h5">
            Об актере
          </Typography>
          <Grid container>
            <Grid xs={6} item mr={20}>
              <Typography gutterBottom>Карьера </Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid>

            <Grid xs={6} item mr={20}>
              <Typography gutterBottom>Рост </Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography gutterBottom>{data.growth}</Typography>
            </Grid>

            <Grid xs={6} item mr={20}>
              <Typography gutterBottom>Дата рождения </Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography gutterBottom>
                {data.birthdat}({data.age}лет)
              </Typography>
            </Grid>

            <Grid xs={6} item mr={20}>
              <Typography gutterBottom>Всего фильмов </Typography>
            </Grid>
            <Grid xs={6} item>
              <Typography gutterBottom>{data.films.length}</Typography>
            </Grid>

            <Grid xs={6} item mr={20}>
              <Typography gutterBottom>Факты </Typography>
            </Grid>
            <Grid xs={12} item>
              {data.facts.map((fact, index) => (
                <Typography key={fact} gutterBottom>
                  {index + 1}
                  {fact}
                </Typography>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Фильмы</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Stack>
        {data.films
          .filter(
            (item, index, self) =>
              index === self.findIndex(el => el.filmId === item.filmId),
          )
          .map((film, index) => (
            <Stack
              key={film.filmId}
              flexDirection="row"
              justifyContent="space-between"
            >
              <Typography>{index + 1}</Typography>
              <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              <Typography>{film.rating ? film.rating : "-"}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  );
};

export default ActorDetail;
