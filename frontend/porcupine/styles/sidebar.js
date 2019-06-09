import styleSheet from "../constants/styles";

const styles = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    position: "fixed",
    top: "0px",
    left: "0px",
    bottom: "0px",
    width: "20%",
    backgroundColor: styleSheet.primaryLightColor,
    zIndex: 20,
    // boxShadow: "5px 0px 10px #F3F3F3",
    transition: "transform 0.1s ease-in-out",
    "@media(max-width: 1200px)": {
      width: "240px",
      transform: "translateX(-240px)"
    },
    active: {
      transform: "translateX(0)",
      "@media(max-width: 1200px)": {
        transform: "translateX(0)"
      }
    }
  },
  search: {
    paddingLeft: "0.5rem"
  },
  nodes: {
    paddingLeft: "0.5rem",
    boxShadow: "-10px 10px 10px 0px rgba(0,0,0,0.1)"
  },
  nodeBox: {
    paddingLeft: "0.5rem",
    overflowY: "auto"
  },
  panelGroup: {
    paddingRight: "0.5rem",
    paddingTop: "20px",
    fontWeight: "bold"
  },
  actionsPanel: {
    paddingLeft: "0.5rem",
    boxShadow: "-20px -2px 20px 0px rgba(0,0,0,0.2)"
  },
  logoSidebar: {
    textAlign: "center",
    width: "100%",
    margin: "0px",
    backgroundColor: styleSheet.tertiaryColor
  },
  logo: {
    maxHeight: "50px",
    margin: "0 auto",
    padding: "7px 0px 7px 0px"
  },
  sidebarHeading: {
    fontFamily: "Nexa-Light",
    color: "#9ea2a9",
    margin: "0px",
    padding: "10px 0px 10px 0px"
  },
  panelText: {
    fontFamily: "Nexa-Bold",
    paddingLeft: "0px",
    fontWeight: "bold",
    textAlign: "left",
    color: "#333",
    marginRight: "0.4rem"
  },
  panelIcon: {
    width: "7%",
    fontSize: "1.4rem",
    marginRight: "0.4rem"
  },
  buttons: {
    textAlign: "center"
  },
  searchInput: {
    width: "80%",
    marginRight: "0.4rem"
  },
  githubButton: {
    marginLeft: "0.4rem"
  },

  header: {
    position: "absolute",
    top: "0px",
    left: "0px",
    height: "50px",
    overflow: "hidden"
  },
  content: {
    position: "absolute",
    top: "50px",
    bottom: "50px",
    left: "0px",
    overflow: "auto"
  },
  footer: {
    position: "absolute",
    bottom: "0px",
    height: "50px",
    left: "0px",
    overflow: "hidden"
  }
};

export default styles;
