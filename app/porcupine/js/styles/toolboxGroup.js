import styleSheet from "../constants/styles";

const styles = {
  toolboxHeader: {
    color: "#9ea2a9",
    textAlign: "center"
  },
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
