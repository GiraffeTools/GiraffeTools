const root = {
  mainColor: '#000',
  mainColorHigh: '#222',
  textColor: '#ccc',
  textHover: ' #fff',
};

const styles = {
  toolbar: {
    overflowY: 'visible',
    position: 'absolute',
    top: '0px',
    zIndex: 1,
    left: '0px',
    background: root.mainColor,
    width: '100%',
    fontWeight: 300,
  },
  toolbarBrand: {
    'color': root.textHover,
    'fontWeight': 100,
    'background': 'transparent',
    '&hover': {
      background: 'transparent',
      fontWeight: 400,
    },
  },
};
export default styles;
