import { Box, Typography } from "@mui/material";
import React from "react";

const ErrorMessage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      margin="auto"
    >
      <Typography variant="h6">
        Произошла ошибка... Попробуйте обновить страницу
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
