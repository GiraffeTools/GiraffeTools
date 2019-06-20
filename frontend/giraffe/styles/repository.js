import styleSheet from "../constants/styles";
import headingStyles from "./headings";
const styles = {
  commitTitle: {
    ...headingStyles.h4,
    margin: "2rem"
  },
  repository: {
    display: "flex"
  },
  branchText: {
    borderColor: `${styleSheet.primaryColor}`,
    borderWidth: "3px",
    padding: " 0rem 1rem",
    margin: "0rem 1rem"
  }
};

export default styles;
