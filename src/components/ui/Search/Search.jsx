import React, { useEffect, useState } from "react";

import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useGetFilmsQuery } from "../../../services/kinopoiskApi";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../features/searchQuerySlice";
import { useNavigate } from "react-router-dom";

const movieTypes = {
  FILM: "Фильм",
  TV_SERIES: "Сериал",
  TV_SHOW: "ТВ-Шоу",
  MINI_SERIES: "Мини-сериал",
};

const Search = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countries, genreId, order, type, year, page, keyword } = useSelector(
    state => state.searchQuery,
  );
  const { data, isFetching } = useGetFilmsQuery({
    countries,
    genreId,
    order,
    type,
    year,
    page,
    keyword,
  });

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      dispatch(setSearchQuery({ keyword: input }));
    }, 500);
    return () => clearTimeout(setTimeoutId);
  }, [input]);

  return (
    <Autocomplete
      freeSolo
      sx={{
        width: 300,
        backgroundColor: "rgba(255,255,255, 0.15",
        "& .MuiOutLinedinput-root": {
          "& fieldset": {
            border: "none",
          },
        },
      }}
      getOptionLabel={option =>
        `${option.nameRu} - ${option.year}(${movieTypes[option.type]})`
      }
      options={data ? data.items : []}
      onInputChange={(_, value) => {
        setInput(value);
      }}
      onChange={(_, value) => {
        console.log(value);
        navigate(`/movie/${value.kinopoiskId}`);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Поиск"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default Search;
