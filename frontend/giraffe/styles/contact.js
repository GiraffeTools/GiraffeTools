import styleSheet from '../constants/styles';

const styles = {
  contact: {
    height: '22rem',
    backgroundColor: styleSheet.primaryLightColor,
  },

  joinUs: {
    top: '50%',
    transform: 'translateY(-50%)',
    position: 'absolute',
    textAlign: 'center',
  },

  mailTag: {
    left: '63%',
    top: '22%',
    float: 'left',
    position: 'absolute',
  },

  githubTag: {
    left: '42%',
    top: '46%',
    float: 'left',
    position: 'absolute',
  },

  iconTitleText: {
    fontFamily: 'Nexa-Bold',
    color: styleSheet.secondaryColor,
    fontSize: '2.3rem',
    fontWeight: 'bold',
  },

  iconTile: {
    width: '25%',
    marginLeft: '1.2rem',
    marginRight: '1.2rem',
  },
};

export default styles;
