import React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { BOTTOM_BAR_HEIGHT } from "./constants";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    right: 0,
    height: theme.spacing(BOTTOM_BAR_HEIGHT),
  },
}));

// TODO: ensure selected always matches path
export const BottomNavBar = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        component={Link}
        to="/recipes"
        label="Recipes"
        icon={<MenuBookIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/shopping-list"
        label="Shopping List"
        icon={<ListIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/settings"
        label="Settings"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
};
