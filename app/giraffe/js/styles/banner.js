import buttonStyles from "./buttons";

const styles = {
  banner: {
    backgroundImage: `url('/static/img/header_subpage_background.jpg')`,
    backgroundSize: "cover",
    height: "22rem",
    marginBottom: "2rem"
  },
  bannerLogo: {
    top: "50%",
    transform: "translateY(-50%)",
    height: "50%",
    marginLeft: "6rem"
  },
  bannerTitle: {
    top: "50%",
    transform: "translateY(-50%)",
    left: "30%",
    fontSize: "65px"
  },
  open: {
    ...buttonStyles.giraffeButton,
    ...buttonStyles.giraffeButton.small
  }
};

export default styles;
