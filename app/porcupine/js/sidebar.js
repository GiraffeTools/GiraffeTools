import React from 'react';
import { connect } from 'react-redux';

import PaneGroup from './paneGroup';
import nodes from '../static/assets/nipype.json';


const nodeList = Object.keys(nodes.categories).map(function(category) {
  return (
    <PaneGroup
      key = {category}
      category = {[category]}
    />
  )
})

function toggleMenu (state) {
  var newState = Object.assign({}, state)
  newState.showSidebar = !newState.showSidebar
  return newState;
}

const mapStateToProps = (state) => {
  return {

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    showSidebar: state.showSidebar
  };
};

const Sidebar = ({showSidebar}) => {
  return (
    <div id="sidebar visible">
      {showSidebar ?
        <div className="col-md-12">
          <div className="panel-group" id="menu" role="tablist" aria-multiselectable="true">
            {nodeList}
          </div>
          <h5 className="sidebar-heading">EXTRAS</h5>
          <a className="btn btn-block extra-buttons text-left" href="https://github.com/TimVanMourik" target="_blank">Tim van Mourik</a>
          <a className="btn btn-block extra-buttons text-left" href="https://timvanmourik.github.io/Porcupine" target="_blank">Porcupine</a>
        </div>
        :
        <div id="sidebar">
        </div>}
    </div>);
};

const SidebarContainer = connect(mapStateToProps)(Sidebar);

export default SidebarContainer;
