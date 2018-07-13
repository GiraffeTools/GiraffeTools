import React from 'react';
import { connect } from 'react-redux';

import Link from '../components/link';
import {
	links,
} from '../selectors/selectors';


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

const mapStateToProps = state => ({
		links: links(state),
})

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);
