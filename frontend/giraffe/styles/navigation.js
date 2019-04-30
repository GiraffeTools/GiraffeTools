import styleSheet from "../constants/styles";
import buttonStyles from "./buttons";

const styles = {
  navTop: {
    left: "unset",
    pointerEvents: "none",
    out: {
      pointerEvents: "auto"
    }
  },
  navigation: {
    WebkitTransition: "transform 0.3s ease",
    MozTransition: "transform 0.3s ease",
    OTransition: "transform 0.3s ease",
    transition: "transform 0.3s ease",

    backgroundColor: styleSheet.primaryLightColor,
    boxShadow: "0px 0px 5rem black",
    width: "22rem",
    // .in {
    // transform: "translateX(110%) translateY(-110%)",
    // }
    out: {
      transform: "translateX(0%) translateY(0%)"
    }
  },
  brandBox: {
    justifyContent: "flex-start"
  },
  giraffeBrand: {
    width: "50%"
  },
  giraffeBrandLogo: {
    width: "50%"
  },
  navList: {
    listStyle: "none",
    margin: "2rem 0rem",
    paddingLeft: "0rem"
  },
  navTriangle: {
    position: "fixed",
    right: 0,
    width: "12rem",
    float: "right",
    pointerEvents: "auto",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
    cursor: "pointer",
    zIndex: 1
  },
  loginTextNav: {
    color: "black",
    fontFamily: "Nexa-Bold",
    fontSize: "1.6rem"
  },
  githubButton: {
    ...buttonStyles.githubButton
  }
};

export default styles;
