const root = {
  mainColor: "#000",
  mainColorHigh: "#222",
  textColor: "#ccc",
  textHover: " #fff"
};

const styles = {
  dropdown: {
    position: "relative",
    display: "inline-block",
    color: root.textColor,
    overflow: "visible",
    "&hover": {
      background: root.mainColor,
      color: root.textHover
    }
  },
  dropdownContent: {
    display: "none",
    position: "absolute",
    backgroundColor: "#000",
    minWidth: "200px",
    width: "auto",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    zIndex: 2,
    "&hover": {
      background: root.mainColor,
      color: root.textHover
    }
  }
};
export default styles;
