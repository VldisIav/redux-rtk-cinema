import { Stack, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Stack
      component="footer"
      sx={{
        paddingTop: 4,
        paddingBottom: 4,
        flexDirection: { sm: "row" },
        justifyContent: { sm: "space-between" },
        alignItems: { sm: "center" },
        marginTop: "auto",
      }}
    >
      <Stack>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} &laquo;Yerk Movies&raquo; 18+ <br />{" "}
          Данный сайт был разработан в обучающих целях!
        </Typography>
      </Stack>

      <Stack>
        <Typography color="primary-main" variant="h4">
          Yerk Movies
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Footer;
