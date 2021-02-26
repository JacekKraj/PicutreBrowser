import React from "react";

import classes from "./backdrop.module.scss";

const Backdrop = (props) => {
  return (
    <div className={classes.backdropComponent} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default Backdrop;
