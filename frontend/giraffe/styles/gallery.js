import styleSheet from "../constants/styles";
import buttonStyles from "./buttons";

const styles = {
  intro: {
    textAlign: "center",
    width: "60%",
    marginTop: "3rem",
    marginBottom: "3rem",
    marginLeft: "20%",
    marginRight: "20%"
  },
  cardContainer: {
    width: "80%",
    marginBottom: "3rem"
  },
  contribute: {
    ...buttonStyles.giraffeButton,
    ...buttonStyles.giraffeButton.large,
    fontSize: "1.6rem"
  },
  galleryBox: {
    width: "80%"
  },
  hr: {
    backgroundColor: styleSheet.primaryColor
  }
};

export default styles;
