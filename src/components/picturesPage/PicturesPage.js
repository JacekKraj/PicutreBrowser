import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { PicturesContext } from "./../../App";
import classes from "./picturesPage.module.scss";
import BrowserInput from "./../browserInput/BrowserInput";
import Header from "./../mainPage/header/Header";
import PoweredByInfo from "./../poweredByInfo/PoweredByInfo";
import Picture from "./picture/Picture";
import Backdrop from "./../backdrop/Backdrop";
import PictureModal from "./pictureModal/PictureModal";
import Spinner from "./../spinner/Spinner";

const PicturesPage = () => {
  const [showPictureInModal, setShowPictureInModal] = useState("");
  const [pageNumber, setPageNumber] = useState(2);

  const picturesContext = useContext(PicturesContext);

  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname !== "/") {
      const value = history.location.pathname.replace("/", "");
      picturesContext.getPictures(value.toLowerCase(), 1);
      setPageNumber(2);
    }
  }, [history.location.pathname]);

  const pictures = picturesContext.pictures.map((el, index) => {
    return <Picture link={el.smallPictureUrl} descripton={el.description} key={index} id={el.id} setPictureId={(id) => setShowPictureInModal(id)} />;
  });

  const getNextPictures = (nextPageNumber) => {
    picturesContext.getPictures(picturesContext.searchedValue, nextPageNumber);
    setPageNumber(pageNumber + 1);
  };

  const resultsInfo = picturesContext.foundPictures ? (
    <div className={classes.resultsInfoContainer}>
      <h3 className={classes.resultsInfo}>
        Results for <span className={classes.searchedValue}>{picturesContext.searchedValue}</span>
      </h3>
    </div>
  ) : (
    <div className={classes.resultsInfoContainer}>
      <h3 className={classes.resultsInfo}>
        Keyword - <span className={classes.searchedValue}>{picturesContext.searchedValue}</span> - doesn't match any photos.{" "}
      </h3>
      <p>Hints:</p>
      <ul>
        <li>Check if all words have been written correctly.</li>
        <li>Try to use other keywords.</li>
        <li>Try to use more general keywords.</li>
      </ul>
    </div>
  );

  return (
    <React.Fragment>
      <div className={classes.picturesPageComponent}>
        <Header />
        <div className={classes.inputComponentBox}>
          <BrowserInput />
        </div>
        <div className={classes.mainContent}>
          {resultsInfo}
          <InfiniteScroll
            dataLength={picturesContext.pictures.length}
            hasMore={picturesContext.hasMore}
            loader={<Spinner />}
            next={() => {
              getNextPictures(pageNumber);
            }}
          >
            <div className={classes.pictures}>{pictures}</div>
          </InfiniteScroll>
        </div>
        <PoweredByInfo />
      </div>
      {showPictureInModal && (
        <React.Fragment>
          <Backdrop onClick={() => setShowPictureInModal(false)} />
          <PictureModal id={showPictureInModal} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default PicturesPage;
