import styleSheet from '../constants/styles';

const styles = {
  viewWrapper: {
    'width': '80%',
    'left': '20%',
    'height': '100%',
    'position': 'fixed',
    'margin': 0,
    'display': 'flex',
    'boxShadow': 'none',
    'transition': 'opacity 0.167s',
    'backgroundColor': styleSheet.primaryLightSecondaryColor,
    '@media(max-width: 1200px)': {
      width: '100%',
      left: '0%',
    },
  },
};

export default styles;
