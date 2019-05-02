import styleSheet from "../constants/styles";

const styles = {
  giraffeButton: {
    fontFamily: "Nexa-Bold",
    backgroundColor: styleSheet.primaryColor,
    color: "white",
    textAlign: "center",
    borderColor: "none",
    large: {
      borderRadius: "2px"
    },
    small: {
      fontSize: "1.7rem",
      padding: "0.2rem 2rem",
      borderRadius: "2px"
    },
    ":hover": {
      textDecoration: "none",
      borderColor: "grey"
    }
  },

  // .no-giraffe-button{
  //   font-family: 'Nexa-Bold';
  //   font-size: 1.2rem;
  //   background-color: #EDEDEE;
  //   color: $primary-color;
  //   border-color: $primary-color;
  //   border-width: 2px;
  // }

  githubButton: {
    width: "15%",
    marginRight: "0.5rem"
  }
};

export default styles;
