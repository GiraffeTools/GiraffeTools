import styleSheet from "../constants/styles";

const styles = {
  toolboxBox: {
    padding: "0.2rem"
  },
  toolboxHeader: {
    color: styleSheet.secondaryColor,
    fontWeight: "bold",
    textAlign: "center",
    cursor: "pointer"
  },
  toolboxName: {},
  expand: {
    height: "0.8rem",
    marginLeft: "0.4rem",
    transform: "rotate(-90deg)",
    transition: "transform 0.3s",
    cursor: "pointer",
    close: {
      transform: "rotate(90deg)"
    }
  }
};

export default styles;
