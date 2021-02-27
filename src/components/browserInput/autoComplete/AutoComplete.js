import React from "react";

import classes from "./autoComplete.module.scss";
import Suggestion from "./suggestion/Suggestion";

const AutoComplete = (props) => {
  return (
    <div className={classes.autoCompleteComponent} style={{ display: props.suggestions.length || props.noSuggestions ? "block" : "none" }}>
      {props.suggestions.map((el) => {
        return <Suggestion key={el.query} suggestion={el.query} handleSubmit={props.handleSubmit} />;
      })}
      {props.noSuggestions ? <div className={classes.noSuggestions}>No suggestions for this keyword</div> : null}
    </div>
  );
};

export default AutoComplete;
