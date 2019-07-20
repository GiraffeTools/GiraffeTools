import iconStyles from './icons';
import buttonStyles from './buttons';

const styles = {
  commitHashButton: {
    'fontFamily': 'Nexa-Bold',
    'fontSize': '1.2rem',
    'backgroundColor': 'white',
    'color': 'black',
    'borderColor': 'grey',
    'borderWidth': '1px',
    'borderRadius': '2px',
    'padding': '0.5rem',
    'width': '8rem',
    'marginRight': '0.7rem',
    '@media(maxWidth: 1200px)': {
      display: 'none',
    },
  },

  commitBox: {
    marginTop: '1rem',
    paddingBottom: '1rem',
    marginLeft: '0rem',
    marginRight: '0rem',
    borderBottom: '1px solid #dee2e6',
  },

  githubButton: {
    ...iconStyles.github,
  },

  openButton: {
    ...buttonStyles.giraffeButton,
    ...buttonStyles.giraffeButton.small,
  },
};

export default styles;
