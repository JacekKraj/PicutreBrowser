import React, { useState } from "react";

import classes from "./browserInput.module.scss";

const BrowserInput = () => {
  const [value, setValue] = useState();
  return (
    <input
      className={classes.input}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      placeholder="Search for the picture"
    ></input>
  );
};

export default BrowserInput;
