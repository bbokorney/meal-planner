import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: theme.spacing(0),
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(4),
  },
}));
export const BackButtonHeader = ({ text }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" marginTop="10px">
      <Button classes={classes} onClick={history.goBack}>
        <ArrowBackIcon />
      </Button>
      <h2>{text}</h2>
    </Box>
  );
};
