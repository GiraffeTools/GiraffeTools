const styles = {
  qrcode: {},
  markerWindow: {
    zIndex: 1,
    width: "30%",
    transition: "transform 0.6s",
    transform: " translateY(20%)",
    closed: {
      transform: " translateY(-80%)"
    }
  },
  header: {
    backgroundColor: "#FFF",
    borderRadius: "0.6rem"
  },
  headerContent: {
    padding: "1rem 2rem",
    backgroundColor: "rgba(90, 97, 105, 0.06)",
    borderBottom: "none"
  },
  closeMarkerButton: {
    fontSize: "30px"
  },
  markerButton: {
    fontSize: "20px",
    cursor: "pointer",
    textAlign: "center",
    zIndex: 1,
    transform: "rotate(90deg)",
    transition: "transform 0.6s",
    closed: {
      transform: "rotate(270deg)"
    }
  },
  neurovaultLabel: {}
};
export default styles;

/* ------------ End of sidebar style ------------ */
//
// ::-webkit-scrollbar{
//     width:1px;
// }
//
// ::-webkit-scrollbar-thumb{
//     border-width:1px 1px 1px 2px;
//     border-color: #777;
//     background-color: #aaa;
// }
//
// ::-webkit-scrollbar-thumb:hover{
//     border-width: 1px 1px 1px 2px;
//     border-color: #555;
//     background-color: #777;
// }
//
// ::-webkit-scrollbar-track{
//     border-width:0;
// }
