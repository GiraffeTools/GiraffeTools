import styleSheet from "../constants/styles";
import buttonStyles from "./buttons";

const styles = {
  cardContainer: {
    marginBottom: "2rem"
  },
  card: {
    height: "100%",
    backgroundColor: styleSheet.primaryLightColor
  },
  cardTitle: {
    fontFamily: "Nexa-Bold",
    fontSize: "1.6rem",
    color: styleSheet.h3Color
  },
  separator: {
    width: "33%",
    marginBottom: "1rem",
    marginTop: "1rem"
  },
  cardBody: {
    backgroundColor: styleSheet.primaryLightColor
  },
  cardImage: {
    width: "100%"
  },
  discover: {
    ...buttonStyles.giraffeButton,
    borderRadius: 0,
    width: "60%",
    marginRight: "20%",
    marginLeft: "20%",
    marginBottom: "10%",
    fontSize: "1.2rem"
  }
};

export default styles;
