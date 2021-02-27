import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import classes from "./app.module.scss";
import MainPage from "./components/mainPage/MainPage";
import PicturesPage from "./components/picturesPage/PicturesPage";

export const PicturesContext = React.createContext(null);

const App = () => {
  const [pictures, setPictures] = useState([]);
  const [searchedValue, setSearchedValue] = useState("");
  const [foundPictures, setFoundPictures] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const getPicturesFromTheServer = (value, pageNumber) => {
    value !== searchedValue && setSearchedValue(value);
    const apiKey = process.env.REACT_APP_UNSPLASH_ACCESSKEY;
    const url = `https://api.unsplash.com/search/photos?query=${value}&page=${pageNumber}&per_page=30&client_id=${apiKey}`;
    axios
      .get(url)
      .then((response) => {
        if (response.data.total) {
          value !== searchedValue && setPictures([]);
          setFoundPictures(true);
          response.data.results.length >= 30 ? setHasMore(true) : setHasMore(false);
          const newPictures = response.data.results.map((el) => {
            return {
              id: el.id,
              authorName: el.user.name,
              authorProfileImage: el.user.profile_image.small,
              location: el.user.location,
              smallPictureUrl: el.urls.small,
              regularPictureUrl: el.urls.regular,
              description: el.alt_description,
              height: el.height,
              width: el.width,
            };
          });
          setPictures((currState) => [...currState, ...newPictures]);
        } else {
          setPictures([]);
          setFoundPictures(false);
          setHasMore(false);
        }
      })
      .catch(() => {});
  };

  const clearPictures = () => {
    setPictures([]);
  };

  const routes = (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/:id" exact component={PicturesPage} />
    </Switch>
  );

  return (
    <div className={classes.appComponent}>
      <PicturesContext.Provider
        value={{
          getPictures: getPicturesFromTheServer,
          pictures: pictures,
          searchedValue: searchedValue,
          clearPictures: clearPictures,
          foundPictures: foundPictures,
          hasMore: hasMore,
        }}
      >
        {routes}
      </PicturesContext.Provider>
    </div>
  );
};

export default App;
