const styles = {
  zoomSliderWrapper: {
    backgroundColor: "white",
    border: "solid 1px lightgray",
    padding: "6px",
    borderRadius: "2px"
  },
  zoomToFit: {
    backgroundColor: "white",
    border: "solid 1px lightgray",
    outline: "none",
    width: "31px",
    height: "31px",
    borderRadius: "2px",
    cursor: "pointer"
  },
  zoomSlider: {
    transform: "translateY(30%)",
    margin: "0rem 1rem 0.7rem 1rem"
  },
  zoomControls: {
    position: "absolute",
    top: "30px",
    left: "30%",
    zIndex: 100,
    display: "grid",
    gridTemplateColumns: " auto auto auto",
    gridGap: "15px",
    alignItems: "center"
  },
  deleteSelection: {
    backgroundColor: "white",
    border: "solid 1px lightgray",
    outline: "none",
    width: "31px",
    height: "31px",
    borderRadius: "2px",
    cursor: "pointer"
  }
};

export default styles;
