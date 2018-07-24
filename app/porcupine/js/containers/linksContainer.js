import { connect } from 'react-redux';

import Links from '../components/links';
import {
	linksWithPorts,
} from '../selectors/selectors';


const mapStateToProps = state => ({
	links: linksWithPorts(state),
})

const LinksContainer = connect(
  mapStateToProps,
)(Links);

export default LinksContainer;
