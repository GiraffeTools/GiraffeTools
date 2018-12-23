import styleSheet from "../constants/styles";

const styles = {
  close: {
    top: "0.5rem",
    left: "0rem",
    width: "3rem",
    height: "3rem"
  },
  // '@media(max-width: 1200px)': {
  close1: {
    borderTop: "0px solid #333",
    borderBottom: "0px solid #333",
    background: "#333",
    transform: "rotate(45deg)",
    position: "absolute",
    transition: "all 0.1s ease-in-out",
    top: "1rem",
    right: 0,
    left: "1rem",
    bottom: 0,
    height: "0.2rem",
    width: "1.2rem"
  },
  close2: {
    // '@media(max-width: 1200px)': {
    borderTop: "0px solid #333",
    borderBottom: "0px solid #333",
    background: "#333",
    transform: "rotate(-45deg)",
    position: "absolute",
    transition: "all 0.1s ease-in-out",
    top: "1rem",
    right: 0,
    left: "1rem",
    bottom: 0,
    height: "0.2rem",
    width: "1.2rem"
    // },
  },
  open1: {
    content: "",
    position: "absolute",
    margin: "auto",
    height: "0.2rem",
    width: "1.5rem",
    background: "#333",
    transition: "all 0.1s ease-in-out",
    top: "3rem",
    right: 0,
    left: "2rem",
    bottom: 0
  },
  open2: {
    content: "",
    position: "absolute",
    margin: "auto",
    height: "1.2rem",
    width: "1.5rem",
    borderTop: "0.2rem solid #333",
    borderBottom: "0.2rem solid #333",
    transition: "all 0.1s ease-in-out",
    top: "3rem",
    right: 0,
    left: "2rem",
    bottom: 0
  },
  sidebarButton: {
    position: "absolute",
    top: "0.3rem",
    left: "1rem",
    width: "3rem",
    height: "3rem",
    zIndex: 30,
    cursor: "pointer"
    // '@media(max-width: 1200px)': {
    //   ':before': {
    //     content: '',
    //     position: 'absolute',
    //     top: 0,
    //     right: 0,
    //     left: 0,
    //     bottom: 0,
    //     margin: 'auto',
    //     height: '1.2rem',
    //     width: '1.5rem',
    //     background: '#333',
    //     transition: 'all 0.1s ease-in-out',
    //   },
    //   ':after': {
    //     content: '',
    //     position: 'absolute',
    //     top: 0,
    //     right: 0,
    //     left: 0,
    //     bottom: 0,
    //     margin: 'auto',
    //     height: '1.2rem',
    //     width: '1.5rem',
    //     borderTop: '0.2rem solid #333',
    //     borderBottom: '0.2rem solid #333',
    //     transition: 'all 0.1s ease-in-out',
    //   },
    // }
  }
};

export default styles;
