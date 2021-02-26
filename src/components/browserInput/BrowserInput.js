import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

import classes from "./browserInput.module.scss";

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

const BrowserInput = (props) => {
  const [value, setValue] = useState("");

  const history = useHistory();

  const iconStyle = useStyles();

  const handleSubmit = (value, event) => {
    event.preventDefault();
    const pathname = history.location.pathname.replace("/", "");
    pathname !== value && history.push(`/${value}`);
    setValue("");
  };

  return (
    <div className={classes.inputContainer}>
      <SearchIcon className={classnames(classes.searchIcon, iconStyle.icon)} />
      <form
        onSubmit={(e) => {
          handleSubmit(value, e);
        }}
        className={classes.form}
      >
        <input
          className={classes.input}
          required={true}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder="Search for the picture"
        ></input>
      </form>
    </div>
  );
};

export default BrowserInput;
