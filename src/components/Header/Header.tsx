import React, { useEffect } from "react";

import Mui from "../../mui";

const Search = Mui.styled("div")(({ theme }: any) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: Mui.alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: Mui.alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = Mui.styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = Mui.styled(Mui.InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Header = (): React.ReactElement => {
  useEffect(() => {
    fetch("https://api.ipregistry.co/?key=tryout")
      .then(function (response) {
        return response.json();
      })
      .then(function (payload) {
        console.log(
          payload.location.country.name + ", " + payload.location.city
        );
      });
  }, []);

  return (
    <Mui.Box sx={{ flexGrow: 1 }}>
      <Mui.AppBar position="static">
        <Mui.Toolbar>
          <Mui.IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <Mui.MenuIcon />
          </Mui.IconButton>
          <Mui.Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Mui.Typography>
          <Search>
            <SearchIconWrapper>
              <Mui.SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Mui.Toolbar>
      </Mui.AppBar>
    </Mui.Box>
  );
};

export default Header;
