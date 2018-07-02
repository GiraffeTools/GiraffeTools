import React from 'react';
import PaneGroup from './paneGroup';
import nodes from '../static/assets/nipype.json';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const nodeList = Object.keys(nodes.categories).map(function(category) {
      return (
        <PaneGroup
          key = {category}
          category = {[category]}
        />
      )
    })

    return (
      <div id="sidebar">
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
    );
  }
}

export default Sidebar;
