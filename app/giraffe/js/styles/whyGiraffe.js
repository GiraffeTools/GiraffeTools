import headingStyles from "./headings";
import componentStyles from "./components";

const styles = {
  whyGiraffe: {
    textAlign: "center",
    width: "80%",
    paddingTop: "7rem"
  },

  whyGiraffeHeading: {
    ...headingStyles.h2,
    ...componentStyles.withLines
  },

  whyGiraffeBox: {},

  whyGiraffeImage: {
    width: "60%",
    paddingTop: "5rem",
    paddingBottom: "5rem"
  },

  giraffeImage: {
    position: "absolute",
    top: "13%",
    width: "85%",
    left: "7%",
    height: "80%"
  },

  peopleLines: {
    position: "absolute",
    bottom: "-10%",
    zIndex: -5,
    width: "20%",
    left: "40%"
  }
};

export default styles;
