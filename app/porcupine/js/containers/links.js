import React from 'react';
import { connect } from 'react-redux';

import Link from '../components/link';
import {
	linkSelector,
} from '../selectors/selectors';


const mapStateToProps = state => ({
		links: linkSelector(state),
})

const mapDispatchToProps = dispatch => ({
});

class Links extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.links.map(node => {
      return (
        <Link
        />
      );
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);
