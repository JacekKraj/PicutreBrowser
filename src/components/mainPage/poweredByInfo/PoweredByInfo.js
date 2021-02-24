import React from "react";

import classes from "./poweredByInfo.module.scss";

const PoweredByInfo = () => {
  return (
    <p className={classes.poweredByInfoComponent}>
      Powered by{" "}
      <a href="https://unsplash.com/" target="_blank">
        Unsplash
      </a>
    </p>
  );
};

export default PoweredByInfo;
