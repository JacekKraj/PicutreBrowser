import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import classes from "./mainPage.module.scss";
import Header from "./header/Header";
import BrowserInput from "./browserInput/BrowserInput";
import PoweredByInfo from "./poweredByInfo/PoweredByInfo";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 411,
      md: 600,
      lg: 1024,
      xl: 1150,
      xxl: 1800,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    [theme.breakpoints.up("xs")]: {
      width: 24,
      height: 24,
    },
    [theme.breakpoints.up("sm")]: {
      width: 29,
      height: 29,
    },

    [theme.breakpoints.up("md")]: {
      width: 44,
      height: 44,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 28,
      height: 28,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 32,
      height: 32,
    },

    [`${theme.breakpoints.up("xl")} and (orientation:landscape)`]: {
      width: 32,
      height: 32,
    },

    [`${theme.breakpoints.up("xxl")} and (orientation:landscape)`]: {
      width: 38,
      height: 38,
    },
  },
}));

const MainPage = () => {
  const iconStyle = useStyles();
  return (
    <div className={classes.appComponent}>
      <div className={classes.container}>
        <Header />
        <div className={classes.inputContainer}>
          <SearchIcon className={classnames(classes.searchIcon, iconStyle.icon)} />
          <BrowserInput />
        </div>
      </div>
      <PoweredByInfo />
    </div>
  );
};

export default MainPage;
