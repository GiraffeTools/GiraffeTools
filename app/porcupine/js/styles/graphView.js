import styleSheet from "../constants/styles";

const styles = {
  viewWrapper: {
    height: "100%",
    width: "100%",
    position: "fixed",
    margin: 0,
    display: "flex",
    boxShadow: "none",
    transition: "opacity 0.167s",
    backgroundColor: styleSheet.primaryLightSecondaryColor
  },
  "@media(max-width: 1200px)": {
    width: "80%",
    left: "20%"
  }
};

export default styles;
