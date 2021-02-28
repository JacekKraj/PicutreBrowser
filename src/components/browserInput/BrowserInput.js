import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";
import axios from "axios";

import AutoComplete from "./autoComplete/AutoComplete";
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
  const [suggestions, setSuggestions] = useState([]);
  const [noSuggestions, setNoSuggestions] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const inputContainer = useRef();

  const history = useHistory();

  const iconStyle = useStyles();

  const handleOutsideClick = (event) => {
    if (!inputContainer.current.contains(event.target)) {
      setInputFocus(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSubmit = (value) => {
    const pathname = history.location.pathname.replace("/", "");
    pathname !== value && history.push(`/${value}`);
    setValue("");
    setSuggestions([]);
    setNoSuggestions(false);
  };

  const getSuggestions = (value) => {
    if (value.length >= 3) {
      axios.get(`https://unsplash.com/nautocomplete/${value}`).then((response) => {
        setSuggestions([...response.data.autocomplete]);
        if (response.data.autocomplete.length) {
          setNoSuggestions(false);
        } else {
          setNoSuggestions(true);
        }
      });
    } else {
      setSuggestions([]);
      setNoSuggestions(false);
    }
  };

  return (
    <div className={classes.inputContainer} ref={inputContainer}>
      <SearchIcon className={classnames(classes.searchIcon, iconStyle.icon)} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(value);
        }}
        className={classes.form}
      >
        <input
          autoComplete="off"
          className={classes.input}
          required={true}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            getSuggestions(e.target.value);
          }}
          onFocus={() => {
            setInputFocus(true);
          }}
          placeholder="Search for the picture"
        ></input>
      </form>
      <AutoComplete suggestions={suggestions} inputFocus={inputFocus} noSuggestions={noSuggestions} handleSubmit={handleSubmit} />
    </div>
  );
};

export default BrowserInput;
