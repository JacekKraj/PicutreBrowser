import React from "react";

import classes from "./suggestion.module.scss";

const Suggestion = (props) => {
  return (
    <div className={classes.suggestionComponent} onClick={props.handleSubmit.bind(null, props.suggestion)}>
      {props.suggestion}
    </div>
  );
};

export default Suggestion;
