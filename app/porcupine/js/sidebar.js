import React from 'react';
import { connect } from 'react-redux';

import PaneGroup from './paneGroup';
import nodes from '../static/assets/nipype.json';


function mapStateToProps(state) {
  return {
    showSidebar: state.showSidebar
  };
}

const nodeList = Object.keys(nodes.categories).map(function(category) {
  return (
    <PaneGroup
      key = {category}
      category = {[category]}
    />
  )
})

const onToggleSidebar = () => {
  store.dispatch({
    type: 'TOGGLE_SIDEBAR'
  })
}

const Sidebar = ({showSidebar}) => {
  return (
    <div>
      <a className={"sidebar-button " + (showSidebar ? "" : "close")} onClick={onToggleSidebar}></a>
      <div id="sidebar" className={(showSidebar ? "active" : "")}>
        <div id="logo_sidebar">
          <a href="https://github.com/TimVanMourik"><img src={'/static/img/giraffe.png'} className="img-responsive" alt="logo" id="logo"/></a>
        </div>
        <div className="col-md-12">
          <div className="panel-group" id="menu" role="tablist" aria-multiselectable="true">
            {nodeList}
          </div>
          <h5 className="sidebar-heading">EXTRAS</h5>
          <a className="btn btn-block extra-buttons text-left" href="https://github.com/TimVanMourik" target="_blank">Tim van Mourik</a>
          <a className="btn btn-block extra-buttons text-left" href="https://timvanmourik.github.io/Porcupine" target="_blank">Porcupine</a>
        </div>
      </div>
    </div>
  );
};

const SidebarContainer = connect(mapStateToProps)(Sidebar);
export default SidebarContainer;
