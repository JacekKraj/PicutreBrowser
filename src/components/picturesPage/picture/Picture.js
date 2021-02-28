import React from "react";

import classes from "./picture.module.scss";

const Picture = (props) => {
  return (
    <div
      className={classes.pictureComponent}
      onClick={() => {
        props.setPictureId(props.id);
      }}
    >
      <img src={props.link} alt={props.description} className={classes.picture}></img>
    </div>
  );
};

export default Picture;
