import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";
import MoviesList from "../../ui/MoviesList/MoviesList";
import { ArrowBack } from "@mui/icons-material";
import { MOVIE_LISTS } from "../../../constans";
import {
  useGetFilmsQuery,
  useGetGenresAndCountriesQuery,
} from "../../../services/kinopoiskApi";
import ErrorMessage from "../../ui/ErrorMessage";
import { useSelector } from "react-redux";
import SelectMovies from "../../ui/SelectMovies";

const MoviesListMain = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { countries, order, year, genreId } = useSelector(
    state => state.currentQuery,
  );
  const navigate = useNavigate();

  const movieType = MOVIE_LISTS.find(el => el.url === location.pathname);

  const myGenreId = movieType.url === "/cartoons" ? 18 : genreId;
  const responseFilms = useGetFilmsQuery({
    type: movieType.value,
    countries,
    order,
    year,
    genreId: myGenreId,
    page,
  });
  const responseGenresAndCountries = useGetGenresAndCountriesQuery();

  useEffect(() => {
    setPage(1);
  }, [location]);

  if (responseFilms.error || responseGenresAndCountries.error)
    return <ErrorMessage />;
  if (responseFilms.isLoading || responseGenresAndCountries.isLoading)
    return <p>Loading...</p>;

  return (
    <>
      <Stack flexDirection="row" sx={{ mt: 2, mb: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>
          Назад
        </Button>
        <Typography variant="h4">{movieType.title}</Typography>
      </Stack>
      <SelectMovies
        countriesList={responseGenresAndCountries.data.countries}
        genresList={responseGenresAndCountries.data.genres}
        countries={countries}
        order={order}
        year={year}
        genreId={genreId}
      />
      <MoviesList
        movies={responseFilms.data.items}
        totalPages={responseFilms.data.totalPages}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default MoviesListMain;
