import styleSheet from '../constants/styles';

const styles = {
  codeWindow: {
    'position': 'absolute',
    'bottom': 0,
    'height': '60%',
    'width': '55%',
    'marginLeft': '2rem',
    'marginBottom': '0rem',
    'left': '20%',
    'closed': {
      transform: 'translateY(95%)',
      transition: 'transform 0.1s',
    },
    'withSidebar': {
      '@media(max-width: 1200px)': {
        left: '20%',
      },
    },
    '@media(max-width: 1200px)': {
      left: '0%',
    },
  },
  codeNav: {
    position: 'absolute',
    top: 0,
    transform: 'translateY(-100%)',
  },
  codeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translateY(-100%)',

    background: '#d9a005',
    display: 'inline-block',
    textAlign: 'center',
    height: '2rem',
    width: '4rem',
    borderTopLeftRadius: '8rem',
    borderTopRightRadius: '8rem',
    cursor: 'pointer',
    fontSize: '2rem',
    color: 'black',
  },
  navTabContent: {
    overflowY: 'scroll',
    height: '-webkit-fill-available',
    backgroundColor: 'rgb(40, 44, 52)',
  },
  codeNavItem: {
    backgroundColor: styleSheet.primaryLightColor,
    margin: '0 5px 0 0',
    borderBottom: '0px',
    cursor: 'pointer',
    active: {
      backgroundColor: styleSheet.tertiaryColor,
    },
  },
};

export default styles;
