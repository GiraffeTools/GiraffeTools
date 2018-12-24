import styleSheet from "../constants/styles";

const styles = {
  giraffeButton: {
    fontFamily: "Nexa-Bold",
    backgroundColor: styleSheet.primaryColor,
    color: "white",
    textAlign: "center",
    large: {
      borderRadius: "2px"
    },
    small: {
      fontSize: "1.7rem",
      padding: "0.2rem 2rem",
      borderRadius: "2px"
    },
    ":hover": {
      textDecoration: "none"
    }
  }
};

export default styles;
