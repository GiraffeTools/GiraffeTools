import styleSheet from '../constants/styles';
import componentStyles from './components';
import boxesStyles from './boxes';
import buttonStyles from './buttons';

const styles = {
  project: {
    ...boxesStyles.giraffeBox,
    noGiraffe: {
      backgroundColor: '#EDEDEE',
    },
  },
  projectTitle: {
    fontSize: '2rem',
    marginRight: '1rem',
  },

  publicPrivate: {
    WebkitBorderRadius: '1px',
    padding: '0rem 0.5rem',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'grey',
  },
  open: {
    ...buttonStyles.giraffeButton,
    ...buttonStyles.giraffeButton.small,
  },
  add: {
    fontFamily: 'Nexa-Bold',
    backgroundColor: '#EDEDEE',
    color: styleSheet.primaryColor,
    borderColor: styleSheet.primaryColor,
    borderWidth: '2px',
    borderRadius: '0px',
    fontSize: '1.7rem',
    paddingRight: '3rem',
    paddingLeft: '3rem',
    paddingTop: '0.4rem',
    paddingBottom: '0.4rem',
  },
};

export default styles;
