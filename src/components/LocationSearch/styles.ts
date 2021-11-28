import { makeStyles } from "@mui/styles";

export default makeStyles({
  inputRoot: { color: "#fff" },
  underline: {
    borderBottom: "2px solid white",
    "&:after": {
      // The MUI source seems to use this but it doesn't work
      borderBottom: "2px solid white",
    },
  },
});
