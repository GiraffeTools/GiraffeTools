import styleSheet from "../constants/styles";

const styles = {
  hero: {
    backgroundColor: styleSheet.primaryLightColor,
    backgroundImage: `url('static/img/code_dark_hero_img.png')`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "contain",
    height: "35.5rem"
  },
  heroText: {
    paddingTop: "2rem",
    marginLeft: "6rem"
  },
  heroLogo: {
    width: "11%",
    marginBottom: "60px"
  },
  typewriterText: {},
  headlineDot: {
    marginTop: "66px",
    marginBottom: "34px",
    width: "20px"
  },
  heroSubtitle: {
    marginTop: "0.7rem",
    fontSize: "1.2rem",
    color: "grey"
  },
  loginButton: {
    marginTop: "2rem",
    fontSize: "1.1rem",
    padding: "0.2rem 0rem",
    color: "white",
    ":hover": {
      color: "black"
    }
  }
};

export default styles;
