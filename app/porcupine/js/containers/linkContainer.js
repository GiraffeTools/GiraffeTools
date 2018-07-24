import { connect } from 'react-redux';

import Link from '../components/link';
import {
  deleteLink,
} from '../actions';


const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  deleteLink: (linkId) => dispatch(deleteLink(linkId)),
});

const LinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default LinkContainer;
