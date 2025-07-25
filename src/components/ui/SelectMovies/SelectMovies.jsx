import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  Stack,
} from "@mui/material";
import React from "react";
import { MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { resetQuery, selectQuery } from "../../../features/CurrentQuerySlice";

const SelectMovies = ({
  countriesList,
  genresList,
  countries,
  order,
  year,
  genreId,
}) => {
  const dispatch = useDispatch();

  const ordersList = [
    { title: "По рейтингу", value: "RATING" },
    { title: "По оценкам", value: "NUM_VOTE" },
  ];

  const yearList = new Array(60).fill(null).map((_, index) => ({
    title: new Date().getFullYear() - index,
    value: new Date().getFullYear() - index,
  }));

  return (
    <Stack
      mt={2}
      mb={2}
      sx={{ flexDirection: { sm: "column", md: "row" }, gap: 1 }}
    >
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
        <Select
          value={order}
          onChange={e => dispatch(selectQuery({ order: e.target.value }))}
        >
          {ordersList.map(order => (
            <MenuItem key={order.value} value={order.value}>
              {order.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Страна</InputLabel>
        <Select
          value={countries}
          onChange={e => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {countriesList.map(country => (
            <MenuItem key={country.id} value={country.id}>
              {country.country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Жанр</InputLabel>
        <Select
          value={genreId}
          onChange={e => dispatch(selectQuery({ countries: e.target.value }))}
        >
          {genresList.map(genre => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Год</InputLabel>
        <Select
          value={year}
          onChange={e => dispatch(selectQuery({ year: e.target.value }))}
        >
          {yearList.map(year => (
            <MenuItem key={year.value} value={year.value}>
              {year.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <Button
          onClick={() => dispatch(resetQuery())}
          variant="outlined"
          startIcon={<CloseIcon />}
        >
          Сбросить
        </Button>
      </Box>
    </Stack>
  );
};

export default SelectMovies;
