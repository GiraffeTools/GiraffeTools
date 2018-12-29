const styles = {
  alertSmallScreen: {
    margin: "0px",
    position: "fixed",
    zIndex: 1031,
    width: "95%",
    left: "2.5%",
    top: "2.5%",
    textAlign: "center",
    display: "none",
    "@media(max-width: 1200px)": {
      display: "unset"
    }
  }
};

export default styles;
