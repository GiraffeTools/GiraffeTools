import styleSheet from "../constants/styles";

const styles = {
  contributor: {
    width: "100%",
    float: "left",
    border: "none",
    padding: "2% 2%",
    background: "none"
  },

  avatarImage: {
    filter: "grayscale(1)",
    width: "100%",
    paddingTop: "5px",
    transition: "filter 0.3s",

    ":hover": {
      filter: "grayscale(0)"
    }
  },

  contributorTag: {
    backgroundColor: styleSheet.primaryColor,
    padding: "0.3rem 0rem"
  },

  link: {
    color: "black"
  }
};

export default styles;
