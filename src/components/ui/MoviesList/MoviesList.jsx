import { Pagination, Stack } from "@mui/material";
import React from "react";
import MovieCard from "../MovieCard/MovieCard";

const MoviesList = ({ movies, totalPages, page, setPage }) => {
  console.log(movies);
  console.log(totalPages);
  return (
    <>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {movies.map(movie => (
          <MovieCard movie={movie} key={movie.kinopoiskId} />
        ))}
      </Stack>
      <Stack alignItems="center">
        <Pagination
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
          size="large"
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      </Stack>
    </>
  );
};

export default MoviesList;
