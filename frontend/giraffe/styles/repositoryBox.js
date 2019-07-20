import headingStyles from './headings';
import boxesStyles from './boxes';
import componentStyles from './components';
import buttonStyles from './buttons';

const styles = {
  whitespace: {
    paddingTop: '1rem',
  },

  projectBox: {
    ...boxesStyles.giraffeBox,
    backgroundImage: `url('/static/img/line_bg_coin.png')`,
    backgroundSize: 'cover',
  },
  about: {
    ...headingStyles.h4,
  },
  repoBoxContent: {
    margin: '1rem',
  },
  separator: {
    ...componentStyles.separator,
    width: '100%',
  },
  projectIcon: {
    margin: '0.5rem 0.8rem',
  },

  giraffeLink: {
    color: 'black',
  },
  open: {
    ...buttonStyles.giraffeButton,
    ...buttonStyles.giraffeButton.small,
  },
};

export default styles;
