import React, { useContext, useEffect } from "react";

import classes from "./mainPage.module.scss";
import Header from "./header/Header";
import BrowserInput from "../browserInput/BrowserInput";
import PoweredByInfo from "../poweredByInfo/PoweredByInfo";
import { PicturesContext } from "./../../App";

const MainPage = () => {
  const picturesContext = useContext(PicturesContext);
  useEffect(() => {
    picturesContext.clearPictures();
  }, []);
  return (
    <div>
      <div className={classes.container}>
        <Header />
        <BrowserInput />
      </div>
      <PoweredByInfo />
    </div>
  );
};

export default MainPage;
