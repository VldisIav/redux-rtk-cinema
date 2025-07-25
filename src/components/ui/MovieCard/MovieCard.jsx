import { Box, Link, Rating, Stack, Tooltip } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie, reload = false }) => {
  const linkProps = reload
    ? { component: "a", href: `/movie/${movie.kinopoiskId}` }
    : { component: RouterLink, to: `/movie/${movie.kinopoiskId}` };
  console.log("Movie ID:", movie.kinopoiskId);

  return (
    <Stack className={styles.items}>
      <Link {...linkProps}>
        <img
          src={movie.posterUrlPreview}
          alt={movie.nameRu}
          className={styles.img}
        />
        <Link component="p" textAlign="center" sx={{ width: "200px" }}>
          {movie.nameRu ? movie.nameRu : movie.nameEn}
        </Link>
      </Link>
      {movie.ratingKinopoisk && (
        <Stack alignItems="center">
          <Tooltip title={`${movie.ratingKinopoisk}/10}`}>
            <Box>
              <Rating
                name="read-only"
                value={movie.ratingKinopoisk / 2}
                readOnly
                precision={0.5}
              />
            </Box>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
};

export default MovieCard;
