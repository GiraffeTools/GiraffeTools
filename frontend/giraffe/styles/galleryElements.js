import styleSheet from "../constants/styles";
import buttonStyles from "./buttons";

const styles = {
  exampleCard: {
    margin: "4px",
    backgrounColor: styleSheet.primaryLightColor
  },
  cardImage: {
    width: "100%"
  },
  discover: {
    ...buttonStyles.giraffeButton
  }
};

export default styles;
