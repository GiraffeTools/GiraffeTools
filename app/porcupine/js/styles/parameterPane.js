import styleSheet from "../constants/styles";

const styles = {
  parameters: {
    position: "absolute",
    height: "100%",
    width: "20%",
    backgroundColor: "white",
    color: "black",
    minWidth: "250px",
    maxWidth: "400px",
    // overflow: "auto",
    right: 0,
    transition: "transform 0.1s",
    transform: "translateX(100%)",
    // boxShadow: "-5px 0px 10px #F3F3F3",
    zIndex: 10,
    active: {
      transform: "translateX(0%)"
    }
    // rules: {
    //   "::-webkit-scrollbar-track": {
    //     backgroundColor: "#F5F5F5"
    //   },
    //   "::-webkit-scrollbar": {
    //     backgroundColor: "#F5F5F5"
    //   },
    //   "::-webkit-scrollbar-thumb": {
    //     backgroundColor: "#cdcfd2"
    //   }
    // }
  },
  header: {
    color: "black",
    backgroundColor: "#F3F3F3",
    padding: "1.1em",
    position: "relative"
  },
  name: {
    margin: "0px",
    fontSize: "1.2em",
    wordWrap: "break-word",
    paddingTop: "20px"
  },
  nameInput: {
    width: "100%"
  },
  className: {
    margin: "0px",
    fontSize: "0.9em",
    wordWrap: "break-word",
    paddingTop: "20px"
  },
  documentation: {
    fontSize: "14px",
    textTransform: "uppercase",
    display: "block",
    marginTop: "10px"
  },
  globe: {
    marginRight: "10px"
  },
  close: {
    position: "absolute",
    top: "1em",
    right: "1em",
    fontSize: "1.1rem",
    cursor: "pointer",
    color: "#999"
  },
  fields: {
    padding: "6%"
  },
  delete: {
    background: "#f26091",
    color: "white",
    bottom: "5%",
    width: "100%",
    padding: "7px"
  }
};

export default styles;
