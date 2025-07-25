import {
  useGetFilmsQuery,
  useGetTopFilmsQuery,
} from "../services/kinopoiskApi";
import { TOP_LISTS } from "../constans";
import { useSelector } from "react-redux";

export default function useMoviesQuery() {
  const { countries, order, year, page } = useSelector(
    state => state.currentQuery,
  );
  const responsePopular = useGetTopFilmsQuery({
    type: TOP_LISTS[0].value,
    page,
  });

  const responseBest = useGetTopFilmsQuery({
    type: TOP_LISTS[1].value,
    page,
  });

  const responseFilms = useGetFilmsQuery({
    type: "FILM",
    order,
    countries,
    genreId: "1",
    year,
    page,
  });

  const responseSerials = useGetFilmsQuery({
    type: "TV_SERIES",
    order,
    countries,
    genreId: "1",
    year,
    page,
  });

  const responseCartoons = useGetFilmsQuery({
    type: "FILM",
    genreId: "18",
    order,
    countries,
    year,
    page,
  });

  const isLoading =
    responsePopular.isFetching ||
    responseBest.isFetching ||
    responseSerials.isFetching ||
    responseFilms.isFetching ||
    responseCartoons.isFetching;

  const hasError =
    responsePopular.error ||
    responseBest.error ||
    responseSerials.error ||
    responseFilms.error ||
    responseCartoons.error;

  return {
    isLoading,
    hasError,
    responsePopular,
    responseBest,
    responseFilms,
    responseCartoons,
    responseSerials,
  };
}
