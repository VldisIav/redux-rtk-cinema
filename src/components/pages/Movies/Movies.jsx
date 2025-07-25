import React from "react";
import useMoviesQuery from "../../../hooks/useMoviesQuery";
import BearCarousel, { BearSlideImage } from "bear-react-carousel";
import { Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ErrorMessage from "../../ui/ErrorMessage";

const Movies = () => {
  const {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseCartoons,
    responseSerials,
  } = useMoviesQuery();

  if (isLoading) return <p>Загрузка, загрузочка..</p>;
  if (hasError) return <ErrorMessage />;

  const serializeDataForCarousel = data =>
    data.map(row => (
      <RouterLink key={row.id} to={`/movie/${row.kinopoiskId}`}>
        <BearSlideImage imageUrl={row.posterUrlPreview} />
      </RouterLink>
    ));

  const carouselArr = [
    {
      title: "Популярные фильмы",
      url: "/popular",
      data: serializeDataForCarousel(responsePopular.data.items),
    },
    {
      title: "Лучшие фильмы",
      url: "/best",
      data: serializeDataForCarousel(responseBest.data.items),
    },
    {
      title: "Фильмы",
      url: "/films",
      data: serializeDataForCarousel(responseFilms.data.items),
    },
    {
      title: "Сериалы",
      url: "/serials",
      data: serializeDataForCarousel(responseSerials.data.items),
    },
    {
      title: "Мультфильмы",
      url: "/cartoons",
      data: serializeDataForCarousel(responseCartoons.data.items),
    },
  ];
  return (
    <>
      {carouselArr.map(carousel => (
        <Stack key={carousel.title}>
          <Link
            sx={{ mt: 2, mb: 2 }}
            variant="h4"
            component={RouterLink}
            to={carousel.url}
          >
            {carousel.title}
          </Link>
          <BearCarousel
            data={carousel.data}
            slidesPerView={1}
            slidesPerGroup={1}
            isEnableLoop
            isEnableNavButton
            autoPlayTime={5000}
            isEnableAutoPlay
            breakpoints={{
              375: {
                isEnableAutoPlay: 0,
              },
              760: {
                slidesPerView: 5,
              },
            }}
          />
        </Stack>
      ))}
    </>
  );
};

export default Movies;
