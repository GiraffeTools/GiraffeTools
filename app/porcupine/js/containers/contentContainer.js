import { connect } from 'react-redux';

import Content from '../components/content';
import {
  addNode,
  addLink,
  clearDatabase,
} from '../actions';
import nodeData from '../../static/assets/nipype.json';


const mapStateToProps = state => ({
  showSidebar: state.ui.showSidebar
})

const mapDispatchToProps = dispatch => ({
  addLink: (link) => dispatch(addLink(link)),
  addNode: (node) => dispatch(addNode(node)),
  clearDatabase: () => dispatch(clearDatabase()),
})

const ContentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content)

export default ContentContainer;
