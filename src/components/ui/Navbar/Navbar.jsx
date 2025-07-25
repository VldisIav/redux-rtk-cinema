import {
  AppBar,
  IconButton,
  Toolbar,
  List,
  ListItemText,
  ListItemButton,
  ListItem,
  Drawer,
  Slide,
  useScrollTrigger,
  Box,
  ListItemIcon,
  Typography,
  Link,
  Divider,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { iconComponents, MOVIE_LISTS, TOP_LISTS } from "../../../constans";
import Search from "../Search";
import ToggleColorMode, {
  ColorModeContext,
} from "../../../context/ToggleColorMode";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const Icon = ({ iconName }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent />;
};

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const { toggleColorMode, mode } = useContext(ColorModeContext);
  const handleDrawerToggle = () => {
    setOpen(prevState => !prevState);
  };
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Container maxwidth="lg">
          <Toolbar>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Drawer open={isOpen} onClose={handleDrawerToggle}>
              <Box sx={{ windth: 250 }} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map(item => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider />
                <List>
                  {MOVIE_LISTS.map(item => (
                    <Link key={item.title} component={RouterLink} to={item.url}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Icon iconName={item.icon} />
                          </ListItemIcon>
                          <ListItemText primary={item.title} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Typography
                sx={{ color: "white", textDecoration: "none" }}
                component={RouterLink}
                variant="h4"
                to="/"
              >
                Yerk Movies
              </Typography>
              <Search />
              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Slide>
  );
}
