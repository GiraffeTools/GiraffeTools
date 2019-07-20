import React, {Fragment} from 'react';
import Radium from 'radium';

import Banner from '../../giraffe/components/banner';
import Footer from '../../giraffe/components/footer';
import WorkInProgress from '../components/workInProgress';

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <Banner />
        <WorkInProgress />
        <Footer />
      </Fragment>
    );
  }
}

export default Radium(Content);
