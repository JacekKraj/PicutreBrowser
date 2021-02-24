import React from "react";

import classes from "./app.module.scss";
import MainPage from "./components/mainPage/MainPage";

const App = () => {
  return (
    <div className={classes.appComponent}>
      <MainPage />
    </div>
  );
};

export default App;
