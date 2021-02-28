import React, { useContext } from "react";
import { PicturesContext } from "../../App";

import classes from "./errorPage.module.scss";

const ErrorPage = () => {
  const picturesContext = useContext(PicturesContext);
  return (
    <div className={classes.errorPageComponent}>
      <p className={classes.pageTitle}>Picture Browser</p>
      <p className={classes.errorMessage}>{picturesContext.networkError}.</p>
      <p className={classes.errorMessage}> Something went wrong. Try Again later.</p>
    </div>
  );
};

export default ErrorPage;
