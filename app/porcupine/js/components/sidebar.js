import React from 'react';

import PaneGroup from '../components/paneGroup';
import nodes from '../../static/assets/nipype.json';


const nodeList = Object.keys(nodes.categories).map(function(category) {
  return (
    <PaneGroup
      key = {category}
      category = {[category]}
    />
  );
});

const Sidebar = ({showSidebar, toggleSidebar}) => {
  return (
    <div>
      <a className={"sidebar-button" + (showSidebar ? "" : " close")} onClick={() => toggleSidebar()}></a>
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

export default Sidebar;
