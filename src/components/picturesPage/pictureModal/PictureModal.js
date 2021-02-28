import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import classnames from "classnames";

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
      width: 20,
      height: 20,
      marginRight: 2,
    },

    [`${theme.breakpoints.up("mdlg")} and (orientation:landscape)`]: {
      width: 20,
      height: 20,
      marginRight: 3,
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

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const PictureModal = (props) => {
  const [picture, setPicture] = useState({});
  const picturesContext = useContext(PicturesContext);
  const [screenWidth, screenHeight] = useWindowSize();
  const [pictureWidth, setPictureWidth] = useState(1);
  const [pictureHeigth, setPictureHeigth] = useState(1);
  const [shape, setShape] = useState("");

  const iconStyle = useStyles();

  useEffect(() => {
    const pic = picturesContext.pictures.find((el) => {
      return el.id === props.id;
    });
    let height, width;
    if (screenHeight > screenWidth) {
      for (let i = 0.8; i > 0; i = i - 0.01) {
        let newScreenWidth = i * screenWidth;
        let widthRatio = pic.width / newScreenWidth;

        let testPicHeight = pic.height / widthRatio;
        if (testPicHeight <= screenHeight * 0.8) {
          height = testPicHeight;
          width = pic.width / widthRatio;
          i = 0;
        }
      }
    } else if (screenWidth >= screenHeight) {
      for (let i = 0.68; i > 0; i = i - 0.01) {
        let newScreenHeight = i * screenHeight;
        let heightRatio = pic.height / newScreenHeight;
        if (pic.width / heightRatio <= screenWidth * 0.68) {
          height = pic.height / heightRatio;
          width = pic.width / heightRatio;
          i = 0;
        }
      }
    }
    width >= height ? setShape(classes.horizontal) : setShape(classes.vertical);
    setPictureWidth(width);
    setPictureHeigth(height);

    setPicture(pic);
  }, [screenWidth, screenHeight]);

  return (
    <div className={classnames(classes.pictureModalComponent, shape)}>
      <div className={classes.authorContainer}>
        <img src={picture.authorProfileImage} alt={`${picture.authorName} profile `}></img>
        <p>{picture.authorName}</p>
      </div>
      <div>
        <img
          src={picture.regularPictureUrl}
          className={classes.picture}
          style={{ width: `${pictureWidth}px`, height: `${pictureHeigth}px` }}
          alt={picture.description}
        ></img>
      </div>
      <div className={classes.location}>
        <LocationOnIcon className={iconStyle.icon} />
        <p>{picture.location ? picture.location : "Location unknown"}</p>
      </div>
    </div>
  );
};

export default PictureModal;
