import styleSheet from "../constants/styles";

const styles = {
  sidebar: {
    position: "fixed",
    top: "0px",
    left: "0px",
    bottom: "0px",
    width: "20%",
    overflowY: "auto",
    backgroundColor: styleSheet.primaryLightColor,
    zIndex: 20,
    boxShadow: "5px 0px 10px #F3F3F3",
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
  panelGroup: {
    paddingLeft: "8px",
    paddingRight: "8px",
    margin: "5px 0px 5px 0px",
    fontWeight: "bold"
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
    fontFamily: "ProximaNova-Bold, sans-serif",
    color: "#9ea2a9",
    margin: "0px",
    padding: "10px 0px 10px 0px"
  },
  panelText: {
    fontFamily: "ProximaNova-Bold, sans-serif",
    paddingLeft: "0px",
    fontWeight: "bold",
    textAlign: "left",
    color: "#333",
    marginRight: "0.4rem"
  },
  panelIcon: {
    width: "10%",
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
  }
};

export default styles;
