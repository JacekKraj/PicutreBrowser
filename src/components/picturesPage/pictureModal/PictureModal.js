import React, { useContext, useEffect, useState } from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";

import classes from "./pictureModal.module.scss";
import { PicturesContext } from "./../../../App";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 411,
      md: 600,
      mdlg: 800,
      lg: 1024,
      xl: 1150,
      xxl: 1800,
    },
  },
});

const useStyles = makeStyles(() => ({
  icon: {
    color: "#333",
    [theme.breakpoints.up("xs")]: {
      width: 21,
      height: 21,
      marginRight: 5,
    },
    [theme.breakpoints.up("sm")]: {
      width: 29,
      height: 29,
    },

    [theme.breakpoints.up("md")]: {
      width: 35,
      height: 35,
    },

    [`${theme.breakpoints.up("md")} and (orientation:landscape)`]: {
      width: 22,
      height: 22,
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 20,
      height: 20,
    },

    [`${theme.breakpoints.up("lg")} and (orientation:landscape)`]: {
      width: 32,
      height: 32,
    },

    [`${theme.breakpoints.up("xl")} and (orientation:landscape)`]: {
      width: 32,
      height: 32,
    },

    [`${theme.breakpoints.up("xxl")} and (orientation:landscape)`]: {
      width: 38,
      height: 38,
    },
  },
}));

const PictureModal = (props) => {
  const [picture, setPicture] = useState({});
  const [shape, setShape] = useState("");
  const picturesContext = useContext(PicturesContext);

  const iconStyle = useStyles();

  useEffect(() => {
    const pic = picturesContext.pictures.find((el) => {
      return el.id === props.id;
    });
    let picShape = pic.width > pic.height ? classes.pictureVertical : classes.pictureHorizontal;
    picShape = pic.width === pic.height ? classes.pictureSquare : picShape;
    setShape(picShape);
    setPicture(pic);
  }, [props.pictureId]);

  return (
    <div className={classes.pictureModalComponent}>
      <div className={classes.authorContainer}>
        <img src={picture.authorProfileImage} alt={`${picture.authorName} profile `}></img>
        <p>{picture.authorName}</p>
      </div>
      <div>
        <img src={picture.regularPictureUrl} className={shape} alt={picture.description}></img>
        <p className={classes.pictureDesc}>{picture.description}</p>
      </div>
      <div className={classes.location}>
        <LocationOnIcon className={iconStyle.icon} />
        <p>{picture.location ? picture.location : "Location unknown"}</p>
      </div>
    </div>
  );
};

export default PictureModal;
