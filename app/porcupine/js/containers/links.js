import React from 'react';
import { connect } from 'react-redux';

import Link from '../components/link';
import {
	linksWithPorts,
} from '../selectors/selectors';


class Links extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.links.map(link => {
      return (
        <Link
					id			 = {link.id}
					key			 = {link.id}
					portFrom = {link.portFrom}
					portTo	 = {link.portTo}
        />
      );
    });
  }
}

const mapStateToProps = state => ({
		links: linksWithPorts(state),
})

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Links);
