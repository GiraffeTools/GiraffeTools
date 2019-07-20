import styleSheet from '../constants/styles';

const styles = {
  tryout: {
    textAlign: 'left',
    height: '12rem',
    padding: '3rem',
    backgroundColor: styleSheet.primaryColor,
    backgroundImage: 'url(/static/img/slack_section_background.jpg)',
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
  },
  getStarted: {
    fontFamily: 'Nexa-Bold',
    color: 'white',
    fontSize: '2.2rem',
  },
  githubLogin: {
    alignItems: 'center',
    display: 'flex',
  },
  loginButton: {
    borderRadius: 0.2,
    backgroundColor: '#EFEFEF',
    color: 'black',
  },
};

export default styles;
