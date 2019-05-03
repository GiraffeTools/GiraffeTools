import styleSheet from "../constants/styles";

const styles = {
  contributors: {
    paddingTop: "4rem",
    paddingBottom: "4rem",
    textAlign: "center",
    backgroundColor: styleSheet.primaryLightSecondaryColor,
    display: "flex"
  },

  contributorPanel: {
    padding: "0rem 7%"
  },
  contributorArrow: {
    cursor: "pointer"
  },

  contributorList: {
    marginTop: "4rem"
  },

  gitcoinText: {
    marginTop: "7rem"
  },

  ethQrCode: {
    width: "50%",
    bottom: 0
  }
};

export default styles;
