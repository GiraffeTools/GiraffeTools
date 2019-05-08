import buttonStyles from "./buttons";
import styleSheet from "../constants/styles";
import componentStyles from "./components";
import headingStyles from "./headings";

const styles = {
  giraffeLines: {
    left: "8%",
    width: "26%",
    position: "absolute",
    bottom: "95.8%"
  },
  lines1: {},
  lines2: {
    objectFit: "cover",
    width: "100%",
    height: "6rem"
  },
  lines3: {
    objectFit: "cover",
    width: " 100%",
    height: "8rem"
  },
  porcupineCollage: {
    width: "90%",
    float: "left"
  },
  toolText: {
    paddingTop: "5rem"
  },
  porcupine: {
    ...headingStyles.h3
  },
  separator: {
    marginTop: "1rem",
    marginBottom: "1rem",
    width: "60%"
  },
  innerToolText: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
    color: "grey"
  },
  getStarted: {
    ...buttonStyles.giraffeButton,
    ...buttonStyles.giraffeButton.small
  },
  collage: {
    paddingRight: "0rem",
    paddingLeft: "0rem"
  }
};

export default styles;
