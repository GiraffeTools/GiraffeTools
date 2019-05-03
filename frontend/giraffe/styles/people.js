import styleSheet from "../constants/styles";
import headingStyles from "./headings";
import componentStyles from "./components";

const styles = {
  people: {
    backgroundColor: styleSheet.primaryLightColor,
    paddingBottom: "4rem",
    position: "relative",
    marginTop: "5rem",
    textAlign: "center"
  },

  peopleBackground: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: styleSheet.primaryLightColor,
    transform: " skewY(-6deg)",
    transformOrigin: "top left"
  },
  peopleHeading: {
    ...headingStyles.h2,
    ...componentStyles.withLines
  },
  peopleBox: {
    marginTop: "2rem"
  },
  artsyPortrait: {
    width: "80%"
  },

  peopleTitle: {
    fontSize: "2.2rem"
  },

  icon: {
    margin: "0.2rem",
    width: "3rem"
  }
};

export default styles;
