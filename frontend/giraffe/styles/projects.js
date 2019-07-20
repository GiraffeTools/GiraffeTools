import componentStyles from './components';
import headingStyles from './headings';

const styles = {
  projects: {
    ...headingStyles.h4,
    ...componentStyles.withLines,
  },
};

export default styles;
