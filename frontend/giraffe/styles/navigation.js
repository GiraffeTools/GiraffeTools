import styleSheet from "../constants/styles";
import buttonStyles from "./buttons";

const styles = {
  navMenu: {
    position: "fixed",
    right: 0,
    width: "22rem",
    zIndex: 1,
    backgroundColor: styleSheet.primaryLightColor,
    boxShadow: "0px 0px 5rem black",
    padding: "0.5rem 0.5rem 0rem 2rem",
    WebkitTransition: "transform 0.3s ease",
    MozTransition: "transform 0.3s ease",
    OTransition: "transform 0.3s ease",
    transition: "transform 0.3s ease",
    open: {
      transform: "translateX(0%) translateY(0%)",
    },
    closed: {
      transform: "translateX(110%) translateY(-110%)",
    }
  },
  navTriangle: {
    position: "fixed",
    right: 0,
    width: "12rem",
    float: "right",
    pointerEvents: "auto",
    clipPath: "polygon(100% 0, 0 0, 100% 100%)",
    cursor: "pointer",
    zIndex: 2,
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
