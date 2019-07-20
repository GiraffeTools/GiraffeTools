import styleSheet from '../constants/styles';

const styles = {
  slack: {
    textAlign: 'center',
    height: '15rem',
    padding: '5rem 3rem 3rem 3rem',
    backgroundColor: styleSheet.primaryColor,
    backgroundImage: 'url(/static/img/slack_section_background.jpg)',
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
  },
  slackLink: {
    'color': 'white',
    'fontSize': '32px',
    ':hover': {
      textDecoration: 'none',
    },
  },
  slackLogo: {
    fill: 'white',
    width: '5rem',
    marginRight: '3rem',
  },
  slackText: {
    fontFamily: 'Nexa-Bold',
    color: 'white',
    fontSize: '2.2rem',
  },
};

export default styles;
